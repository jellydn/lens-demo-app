import { Atom, Provider } from "jotai";
import type { AppProps } from "next/app";

import store from "../store";
import "../styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "yes") {
  if (typeof window === "undefined") {
    import("../mocks/server").then(({ server }) => {
      server.listen();
    });
  } else {
    import("../mocks/browser").then(({ browser }) => {
      browser.start();
    });
  }
}

function MyApp({ Component, pageProps }: AppProps<any>) {
  const { initialState } = pageProps;
  return (
    <Provider
      initialValues={initialState &&
        ([[store.counterAtom, initialState]] as Iterable<
          readonly [Atom<unknown>, unknown]
        >)}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
