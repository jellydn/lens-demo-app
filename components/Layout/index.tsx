import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Toaster } from 'react-hot-toast';
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import Authentication from '../Authentication';
import Header from '../Header';

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

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            <div className="flex flex-row justify-around w-full mx-auto">
                <Header
                    links={[
                        {
                            title: 'Contact',
                            url: '/contact',
                        },
                        {
                            title: 'Lens Profile',
                            url: '/profile',
                        },
                    ]}
                />
                <Authentication />
            </div>
            {children}
            <Toaster />
        </RainbowKitProvider>
    </WagmiConfig>
);

export default Layout;
