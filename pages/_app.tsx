import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import '@rainbow-me/rainbowkit/styles.css';
import { Atom, Provider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import store from '../store';
import '../styles/globals.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'yes') {
    if (typeof window === 'undefined') {
        import('../mocks/server').then(({ server }) => {
            server.listen();
        });
    } else {
        import('../mocks/browser').then(({ browser }) => {
            browser.start();
        });
    }
}

const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon],
    [publicProvider()],
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

function MyApp({ Component, pageProps }: AppProps<any>) {
    const { initialState, session } = pageProps;
    return (
        <WagmiConfig client={wagmiClient}>
            <SessionProvider refetchInterval={0} session={session}>
                <RainbowKitSiweNextAuthProvider>
                    <RainbowKitProvider chains={chains}>
                        <Provider
                            initialValues={
                                initialState &&
                                ([
                                    [store.counterAtom, initialState],
                                ] as Iterable<
                                    readonly [Atom<unknown>, unknown]
                                >)
                            }
                        >
                            <Component {...pageProps} />
                        </Provider>
                    </RainbowKitProvider>
                </RainbowKitSiweNextAuthProvider>
            </SessionProvider>
        </WagmiConfig>
    );
}

export default MyApp;
