import '../styles/index.css'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <head>
        <title>DropiNFT</title>
      </head>
      <nav className='border-b p-6'>
        <p className='text-4xl font-bold'>DropiNFT</p>
        <div className='flex mt-4'>
          <Link href="/">
            <a className='mr-6 text-pink-500'>
              Home
            </a>
          </Link>
          <Link href="/create-NFT">
            <a className='mr-6 text-pink-500'>
              Create
            </a>
          </Link>
          <Link href="/owned-assets">
            <a className='mr-6 text-pink-500'>
              My digital assets
            </a>
          </Link>
          <Link href="/dashboard">
            <a className='mr-6 text-pink-500'>
              Dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
