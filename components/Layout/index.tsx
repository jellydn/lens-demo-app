import { Toaster } from 'react-hot-toast';

import Header from "../Header";
import Authentication from "../Authentication";

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <div>
    <div className="flex flex-row justify-around mx-auto w-full">
      <Header
        links={[
          {
            title: "Contact",
            url: "/contact",
          },
          {
            title: "Lens Profile",
            url: "/profile",
          },
        ]}
      />
      <Authentication />
    </div>
    {children}
    <Toaster />
  </div>
);

export default Layout;
