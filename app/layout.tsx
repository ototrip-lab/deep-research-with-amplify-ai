import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { BasicLayout } from "@/app/_components/BasicLayout";
import { ConfigureAmplifyClientSide } from "./_components/ConfigureAmplify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deep Research with Amplify AI",
  description:
    "A comprehensive research assistant powered by AWS Amplify and AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <ConfigureAmplifyClientSide />
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}
