import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/global.css";
import NavBar from "../components/NavBar";
import { AppProps } from "next/app";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />

          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>

        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
