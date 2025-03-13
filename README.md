# Deep Research with Amplify AI

This project provides a comprehensive research assistant powered by AWS Amplify and AI. It uses a multi-agent approach to deliver thorough research on user queries.

## Features

- Planning Agent: Creates structured research plans with 5 distinct categories
- Search Agent: Retrieves high-quality information from trusted sources
- Writer Agent: Synthesizes research findings into cohesive articles
- Total Agent: Orchestrates the workflow across all specialized agents

## Architecture

Built with:
- Next.js for the frontend
- AWS Amplify Gen2 for backend services
- LangChain and LangGraph for AI workflow orchestration
- AWS Bedrock for AI model access
- Tavily for web search capabilities

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure Amplify:
```bash
npx amplify pull
```

3. Run the development server:
```bash
npm run dev
```

## Performance Optimizations

This project includes several optimizations:
- Streamlined prompts to reduce token usage
- Error handling with retry mechanisms
- Performance monitoring with console.time
- Enhanced user experience with loading indicators