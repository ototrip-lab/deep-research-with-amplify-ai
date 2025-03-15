"use client";

import { useAIConversation } from "@/app/client";
import {
  Button,
  Flex,
  View,
  withAuthenticator,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import "@aws-amplify/ui-react/styles.css";
import Markdown from "react-markdown";

const App = ({ signOut }: WithAuthenticatorProps) => {
  const [
    {
      data: { messages },
      isLoading,
      hasError,
    },
    handleSendMessage,
  ] = useAIConversation("chat");

  return (
    <Flex justifyContent="center" alignItems="center">
      <Flex
        direction="column"
        rowGap="l"
        flex={1}
        width="100%"
        maxWidth="1280px"
      >
        <Flex direction="row" rowGap="l">
          <View flex={1} textAlign="center">
            <h1>Deep Research Chat with Amplify AI Kit</h1>
          </View>
          <Flex justifyContent="center" alignItems="center">
            <Button size="small" variation="menu" onClick={signOut}>
              Sign out
            </Button>
          </Flex>
        </Flex>
        <Flex direction="row" rowGap="xxl">
          <AIConversation
            messages={messages}
            isLoading={isLoading && !hasError}
            handleSendMessage={handleSendMessage}
            messageRenderer={{
              text: ({ text }) => <Markdown>{text}</Markdown>,
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withAuthenticator(App);
