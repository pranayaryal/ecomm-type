import "@/styles/globals.css";
import type { AppType } from "next/app";
import type { AppProps } from "next/app";
import { trpc } from '@/utils/trpc'
import Layout from "@/components/layout";


const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  )
}

export default trpc.withTRPC(App);