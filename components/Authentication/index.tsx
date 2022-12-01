import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { authenticate, challenge, client } from '../../api';
import logger from '../../logger';
import Button from '../Button';

declare global {
    interface Window {
        ethereum: ethers.providers.ExternalProvider;
    }
}

export default function Authentication() {
    /* local state variables to hold user's address and access token */
    const [address, setAddress] = useState<string>();
    const [token, setToken] = useState();
    useEffect(() => {
        /* when the app loads, check to see if the user has already connected their wallet */
        checkConnection();
    }, []);

    async function checkConnection(): Promise<void> {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            if (accounts.length) {
                setAddress(accounts[0]);
            }
        }
    }
    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            /* this allows the user to connect their wallet */
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send('eth_requestAccounts', []);
            logger.info({ accounts });
            if (accounts.length) {
                setAddress(accounts[0]);
            }
        }
    }

    async function login() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                /* first request the challenge from the API server */
                const challengeInfo = await client.query({
                    query: challenge,
                    variables: { address },
                });
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum,
                );
                const signer = provider.getSigner();
                /* ask the user to sign a message with the challenge info returned from the server */
                const signature = await signer.signMessage(
                    challengeInfo.data.challenge.text,
                );
                /* authenticate the user */
                const authData = await client.mutate({
                    mutation: authenticate,
                    variables: {
                        address,
                        signature,
                    },
                });
                /* if user authentication is successful, you will receive an accessToken and refreshToken */
                const {
                    data: {
                        authenticate: { accessToken },
                    },
                } = authData;
                setToken(accessToken);
            }
        } catch (err) {
            logger.warn('Error signing in: ', err);
            toast.error('Something went wrong signing in. Please try again.');
        }
    }

    return (
        <div className="flex items-end my-auto">
            {/* if the user has not yet connected their wallet, show a connect button */}
            {!address && <Button onClick={connect}>Connect</Button>}
            {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
            {address && !token && (
                <div onClick={login}>
                    <Button className="btn btn-primary">Login</Button>
                </div>
            )}
            {/* once the user has authenticated, show them a success message */}
            {address && token && <h2>Successfully signed in!</h2>}
        </div>
    );
}
