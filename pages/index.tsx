import Head from "next/head";
import Image from "next/image";

import Counter from "../components/Counter";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Lens Demo App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">Welcome to Lens Protocol Demo App</p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <a
            href="https://productsway.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image
              src="/logo.svg"
              alt="ProductsWay Logo"
              width={30}
              height={40}
              className={styles.logo}
            />
          </a>
          <a
            className="pl-2"
            href="https://vercel.com/new/git/external?repository-url=https://github.com/jellydn/lens-demo-app/"
          >
            <Image
              src="https://vercel.com/button"
              width={100}
              height={40}
              alt="Deploy with Vercel"
            />
          </a>
        </footer>
      </div>
    </Layout>
  );
}
