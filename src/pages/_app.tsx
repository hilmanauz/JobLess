import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { SessionProvider } from "next-auth/react";
import { DataProvider } from "@/useFetchData";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
