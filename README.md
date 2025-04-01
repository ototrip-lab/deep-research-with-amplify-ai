# Amplify Gen2 Next.js Quickstart

This project is a quickstart template combining [AWS Amplify Gen2](https://docs.amplify.aws/gen2/) with [Next.js](https://nextjs.org/). It leverages Amplify Gen2's TypeScript-based infrastructure definitions and Next.js frontend framework to quickly build full-stack applications.

## Features

This quickstart includes the following features:

- **Authentication** - User authentication using Amplify Auth
- **Data Modeling** - Data modeling and API using Amplify Data

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [AWS Account](https://aws.amazon.com/)
- [AWS CLI](https://aws.amazon.com/cli/) (configured)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set Tavily API Key

```bash
$ npx ampx sandbox secret set TAVILY_API_KEY
? Enter secret value: ###
Done!
```

3. Run the Amplify Gen2 backend locally:

```bash
npx ampx sandbox
```

4. In a separate terminal, start the Next.js development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/
├── app/                  # Next.js application code
│   ├── _components/      # Shared components
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── amplify/              # Amplify Gen2 backend definitions
│   ├── auth/             # Authentication resources
│   ├── data/             # Data model resources
│   └── backend.ts        # Backend definition
├── public/               # Static assets
└── ...
```

## Deployment

To deploy to AWS using Amplify Gen2:

1. Deploy the backend:

```bash
npx ampx deploy
```

2. Build the frontend:

```bash
npm run build
```

3. You can deploy using Amplify Hosting or deploy your Next.js application to any hosting service of your choice.

## Learning Resources

- [Amplify Gen2 Documentation](https://docs.amplify.aws/gen2/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Amplify UI Components](https://ui.docs.amplify.aws/)

## Local Development

```bash
# Start development server
npm run dev

# Format code
npm run format

# Type checking
npm run tsc
```

## License

This project is released under the [MIT License](LICENSE).
