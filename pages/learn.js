import { useState, useEffect } from "react";
import Link from "next/link";

export default function learn() {
    return (
        <div className="learn-main">
            <div className='grid grid-cols-2  mt-16 mx-32 mb-32'>
                <div>
                    <img src="https://cdn.discordapp.com/attachments/924003905128517645/965075230567563304/WhatsApp_Image_2022-04-17_at_07.38.34-removebg-preview.png" className="max-w-screen-sm rounded-lg" />

                </div>
                <div className="">
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            What are non-fungible tokens (NFTs)?
                        </div>
                        <div class="collapse-content">
                            <p>Non-fungible tokens are digital assets that contain identifying information recorded in smart contracts. It’s this information that makes each NFT unique, and as such, they cannot be directly replaced by another token. They cannot be swapped like for like, as no two NFTs are alike. Banknotes, in contrast, can be simply exchanged one for another; if they hold the same value, there is no difference to the holder between, say, one dollar bill and another.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            What makes NFTs so special?
                        </div>
                        <div class="collapse-content">
                            <p>Non-fungible tokens have unique attributes; they are usually linked to a specific asset. They can be used to prove the ownership of digital items like game skins right through to the ownership of physical assets.Other tokens are fungible, in the same way as coins or banknotes. Fungible tokens are identical, they have the same attributes and value when exchanged.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            How are non-fungible tokens used?                        </div>
                        <div class="collapse-content">
                            <p>As well as representing digital collectibles like CryptoKitties, NBA Top Shot and Sorare, non-fungible tokens can be used for digital assets that need to be differentiated from each other in order to prove their value, or scarcity. They can represent everything from virtual land parcels to artworks, to ownership licenses. They're bought and sold on NFT marketplaces.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            How do NFTs work?
                        </div>
                        <div class="collapse-content">
                            <p>Tokens like Bitcoin and Ethereum-based ERC-20 tokens are fungible. Ethereum’s non-fungible token standard, as used by platforms such as CryptoKitties and Decentraland, is ERC-721. Non-fungible tokens can also be created on other smart-contract-enabled blockchains with non-fungible token tools and support. Though Ethereum was the first to be widely used, the ecosystem is expanding, with blockchains including Solana, NEO, Tezos, EOS, Flow, Secret Network, and TRON supporting NFTs.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            What’s worth picking up at the NFT supermarket?
                        </div>
                        <div class="collapse-content">
                            <p>NFTs can really be anything digital (such as drawings, music, your brain downloaded and turned into an AI), but a lot of the current excitement is around using the tech to sell digital art.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-4">
                        <div class="collapse-title text-xl font-medium text-purple-500">
                            What are NFT marketplaces?
                        </div>
                        <div class="collapse-content">
                            <p>If you want in on the NFT craze, an NFT marketplace is your gateway to participating in the purchase and sale of these digital assets -- from art to music to entire virtual worlds. Think of NFT marketplaces as your Amazon of the digital realm. There are dozens of NFT marketplaces in existence, and many of them have a specific focus or niche.</p>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}