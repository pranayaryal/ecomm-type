import "@/styles/globals.css";
import type { AppType } from "next/app";
import type { AppProps } from "next/app";
import { trpc } from '@/utils/trpc'
import Layout from "@/components/layout";
// import { ShoppingCartProvider } from "@/context/ShoppingCartProvider";
import { ShoppingCartProviderLocal } from "@/context/ShoppingCartProviderLocal";


const App: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ShoppingCartProviderLocal>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ShoppingCartProviderLocal>
  )
}

export default App;