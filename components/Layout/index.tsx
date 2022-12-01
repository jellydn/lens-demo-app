import { Toaster } from 'react-hot-toast';

import Authentication from '../Authentication';
import Header from '../Header';

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
    <>
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
    </>
);

export default Layout;
