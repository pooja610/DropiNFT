import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
    nftAddress, marketPlaceAddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function OwnedAssets() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    useEffect(() => {
        loadNfts()
    }, [])
    async function loadNfts() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketContract = new ethers.Contract(marketPlaceAddress, NFTMarket.abi, signer)
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider)
        const data = await marketContract.fetchMyNFTs()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
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
            return item;
        }))
        setNfts(items)
        setLoadingState('loaded')
    }
    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className="py-10 px-20 text-3xl">No assets owned</h1>
    )
    return (
        <div className='my-6'>
            <div className='p-4'>
                <h2 className="text-4xl font-bold mx-4">My <span className='text-purple-500'>NFTs</span></h2>
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
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}