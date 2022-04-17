import '../styles/index.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] = useState(0);
  const [padding, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    let backgroundTransparacyVar = clientWindowHeight / 600;

    if (backgroundTransparacyVar < 1) {
      let paddingVar = 20 - backgroundTransparacyVar * 10;
      let boxShadowVar = backgroundTransparacyVar * 0.1;
      setBackgroundTransparacy(backgroundTransparacyVar);
      setPadding(paddingVar);
      setBoxShadow(boxShadowVar);
    }
  }, [clientWindowHeight]);

  return (
    <div>
      <head>
        <title>DropiNFT</title>
      </head>

      <nav className="sticky top-0 z-10 bg-white"
        style={{
          background: `rgba(255, 255, 255)`,
          padding: `${padding}px 0px`,
          boxShadow: `rgb(0 0 0 / ${boxShadow}) 0px 0px 20px 6px`,
        }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-3xl text-gray-900 font-semibold">
              <Link href="/">
                <a className='mr-6 text-black-500'>
                  Dropi<span className='text-purple-500'>NFT</span>
                </a>
              </Link>
            </span>
            <div className="flex gap-4 text-gray-900">
              <Link href="/#explore">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  Explore
                </a>
              </Link>
              <Link href="/create-NFT">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  Create
                </a>
              </Link>
              <Link href="/owned-assets">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  My NFTs
                </a>
              </Link>
              <Link href="/dashboard">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  Dashboard
                </a>
              </Link>
              <Link href="/learn">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  Learn
                </a>
              </Link>
              <Link href="https://github.com/movish01/DropiNFT">
                <a className='mr-6 text-gray-500 hover:text-purple-500 font-medium'>
                  Github
                </a>

                {/* <a target="_blank" href="https://icons8.com/icon/3tC9EQumUAuq/github">GitHub icon by Icons8</a> */}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
