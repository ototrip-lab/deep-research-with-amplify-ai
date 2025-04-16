import { env } from '$amplify/env/searchAgent';
import { ChatBedrockConverse } from "@langchain/aws";
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages';
import { MessagesAnnotation, StateGraph } from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';

import { searchPrompt } from '../../prompts';
import { BEDROCK_MODEL } from '../constants';
import type { Schema } from '../resource';

const tavilyTool = new TavilySearchResults({
  maxResults: 3,
  apiKey: env.TAVILY_API_KEY,
});
const model = new ChatBedrockConverse({
  model: BEDROCK_MODEL,
});
const modelWithTavily = model.bindTools([tavilyTool]);
const toolNode = new ToolNode([tavilyTool]);

// Define the function that determines whether to continue or not
const shouldContinue = ({ messages }: typeof MessagesAnnotation.State) => {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return 'tools';
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
  return '__end__';
};

// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await modelWithTavily.invoke(state.messages);
  console.log({ response });

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
};

export const handler: Schema['searchAgent']['functionHandler'] = async (
  event
) => {
  console.log({ event });

  const authorization = event.request.headers.authorization;
  const identity = event.identity as any;
  const username = identity?.username;
  const message = event.arguments.message;

  if (!authorization || !username || !message) {
    throw new Error('Unauthorized');
  }

  // Define a new graph
  const workflow = new StateGraph(MessagesAnnotation)
    .addNode('agent', callModel)
    .addEdge('__start__', 'agent')

    .addNode('tools', toolNode)
    .addEdge('tools', 'agent')

    .addConditionalEdges('agent', shouldContinue);

  // Finally, we compile it into a LangChain Runnable.
  const app = workflow.compile();

  // Use the agent
  const finalState = await app.invoke({
    messages: [new SystemMessage(searchPrompt), new HumanMessage(message)],
  });
  const answer = finalState.messages[finalState.messages.length - 1];

  return {
    value: answer.content as string,
  };
};
