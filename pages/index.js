import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import Link from 'next/link'

import {
  nftAddress, marketPlaceAddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider()
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(marketPlaceAddress, NFTMarket.abi, provider)

    const data = await marketContract.fetchMarketItems()

    const items = await Promise.all(data.map(async i => {
      const tokenUri = await nftContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft) {
    const web3modal = new Web3Modal()
    const connection = await web3modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)

    const signer = provider.getSigner()
    const contract = new ethers.Contract(marketPlaceAddress, NFTMarket.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nftAddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()

  }

  if (loadingState === 'loaded' && !nfts.length) return (
    <div>
      <div className="hero max-h-full">
        <div className="hero-content grid grid-cols-2 mr-0">
          <div>
            <h1 className="text-8xl font-bold">Dropi<span className='text-purple-500'>NFT</span></h1>
            <p className="py-6">An NFT Marketplace - Buy, Showcase and Learn about NFTs</p>
            <div className='grid grid-cols-5 gap-2 '>
              <Link href="#explore">
                <button className="btn btn-primary btn-outline">Explore</button>
              </Link>
              <Link href="/learn">
                <button className="btn btn-primary btn-outline">Learn</button>
              </Link>


            </div>
          </div>
          <div className=''>
            <img src="https://cdn.dribbble.com/users/729829/screenshots/16260314/media/9dfadcc88b20dedf690e6c76d542cb73.png" className="max-w-screen-sm rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>

      <div className='pt-6 pb-32'>
        <span className="scroll-btn">
          <a href="#explore">
            <span className="mouse">
              <span>
              </span>
            </span>
          </a>
          <p className='text'>Explore Marketplace</p>

        </span>
      </div>
      <h1 className="px-20 py-10 text-4xl font-bold"> No items to show in Marketplace </h1>
    </div>

  )

  return (
    <div className="main-container">

      <div className="hero max-h-full">
        <div className="hero-content grid grid-cols-2 mr-0">
          <div>
            <h1 className="text-8xl font-bold">Dropi<span className='text-purple-500'>NFT</span></h1>
            <p className="py-6">An NFT Marketplace - Buy, Showcase and Learn about NFTs</p>
            <div className='grid grid-cols-5 gap-2 '>
              <Link href="#explore">
                <button className="btn btn-primary btn-outline">Explore</button>
              </Link>
              <Link href="/learn">
                <button className="btn btn-primary btn-outline">Learn</button>
              </Link>


            </div>
          </div>
          <div className=''>
            <img src="https://cdn.dribbble.com/users/729829/screenshots/16260314/media/9dfadcc88b20dedf690e6c76d542cb73.png" className="max-w-screen-sm rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>

      <div className='pt-6 pb-32'>
        <span className="scroll-btn">
          <a href="#explore">
            <span className="mouse">
              <span>
              </span>
            </span>
          </a>
          <p className='text'>Explore Marketplace</p>

        </span>
      </div>



      <div className='my-6' id='explore'>
        <div className='p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mx-6'>
            {
              nfts.map((nft, i) => (
                <div key={i} className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={nft.image} alt="NFT" />
                  <div class="p-6">
                    <h5 class="card-title">{nft.name}</h5>
                    <p class="text-gray-700 text-base mb-4">
                      {nft.description}
                    </p>
                    <p className='break-words'><span className='text-purple-500'>Created By - </span><span className='text-sm'>{nft.seller}</span></p>

                    <h2 className="card-title"><span className='text-purple-500'>Price - </span>{nft.price} Matic</h2>
                    <button className="btn btn-outline btn-primary mt-4" onClick={() => buyNft(nft)}>Buy</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

//                      <button className="btn btn-outline btn-primary" onClick={() => buyNft(nft)}>Buy</button>
