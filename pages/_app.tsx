import "@/styles/globals.css";
import type { AppType } from "next/app";
import type { AppProps } from "next/app";
import { trpc } from '@/utils/trpc'
import Layout from "@/components/layout";
import { ShoppingCartProvider } from "@/context/ShoppingCartProvider";


const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ShoppingCartProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ShoppingCartProvider>
  )
}

export default App;