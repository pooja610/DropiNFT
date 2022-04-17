import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
    nftAddress, marketPlaceAddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import { route } from 'next/dist/server/router'

export default function CreateNFT() {
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
    const router = useRouter()

    async function onChange(e) {
        const file = e.target.files[0]

        try {
            const added = await client.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (e) {
            console.log(e)
        }
    }

    async function createNFT() {
        const { name, description, price } = formInput
        if (!name || !description || !price || !fileUrl) return

        const data = JSON.stringify({
            name, description, image: fileUrl
        })

        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`

            createSale(url)
        } catch (e) {
            console.log('Error uploading file: ', e)
        }
    }

    async function createSale(url) {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()

        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        const price = ethers.utils.parseUnits(formInput.price, 'ether')

        contract = new ethers.Contract(marketPlaceAddress, NFTMarket.abi, signer)
        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await contract.createMarketItem(
            nftAddress, tokenId, price, { value: listingPrice }
        )
        await transaction.wait()
        router.push('/')
    }

    return (
        <div className='grid grid-cols-2  mt-16 mx-32 mb-32'>
            <div>
                <img src='https://cdn.discordapp.com/attachments/924003905128517645/965074874479566949/create-removebg-preview.png' className="max-w-full" />
            </div>
            <div className="justify-center rounded-md border shadow-xl">
                <div className="grid grid-rows-4">
                    <input
                        placeholder="Asset Name"
                        className="mt-8 m-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Asset Description"
                        className="m-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input
                        placeholder="Asset Price"
                        className="m-2 border rounded p-4"
                        onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <input
                        type="file"
                        name="Asset"
                        className="m-4"
                        onChange={onChange}
                    />
                    {
                        fileUrl && (
                            <img className="rounded m-4" width="350" src={fileUrl} />
                        )
                    }
                    <button onClick={createNFT} className="font-bold m-4 btn btn-outline btn-primary p-4 max-w-xs m-auto mb-4">
                        Create NFT
                    </button>
                </div>
            </div>
        </div>

    )

}
