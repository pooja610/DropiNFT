//SPDX-License-Identifier: Unlicense
/// @title DropiNFT - an NFT Marketplace
/// @author Movish Verma

pragma solidity >=0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarket is ReentrancyGuard {

    //Counters for incrementing the specified variables
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    // Specifying Listing Price
    uint256 listingPrice = 0.025 ether;
    address payable owner;

    // Owner of the contract == who is deploying it
    constructor() {
        owner = payable(msg.sender);
    }

    // Items in Market
    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold; // bool chechk if NFT is sold or not
    }   

    mapping(uint => MarketItem) private idToMarketItem; //mappping id to marketItem

    // Event to emit when an Item (NFT) is created
    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isSold
    );

    // for the listing price
    function getListingPrice () public view returns (uint256) {
        return listingPrice;
    }

    // For creating MarketItem (NFT)
    function createMarketItem ( address nftContract, uint256 tokenId, uint256 price) public payable nonReentrant {
        require(price > 0, "Price of Item should be greater than 0");
        require (msg.value == listingPrice, "for the Listing Price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        // mapping the MarketItems
        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        // transferring NFT to contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId, 
            nftContract, 
            tokenId, 
            msg.sender, 
            address(0), 
            price, 
            false
        );
    }

    // for the Sale of Item (NFT)
    function createMarketSale (address nftContract, uint256 itemId) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;

        require (msg.value == price, "Pay the asking price in order to purchase");

        // paying the owner specified price
        idToMarketItem[itemId].seller.transfer(msg.value);

        // transferring NFT
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        // declaring new Owner and marking the item as Sold
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].isSold = true;

        _itemsSold.increment();

        // paying the listing price
        payable(owner).transfer(listingPrice);
    }

    // for getting the items (NFT) in market
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for(uint i = 0; i < itemCount; i++){
            if(idToMarketItem[i+1].owner == address(0)){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // to get the NFTs the user purchases/owns
    function fetchMyNFTs() public view returns (MarketItem[] memory){
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i <totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                itemCount +=1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }

    // to get the NFTs the user created
    function fetchItemsCreated() public view returns (MarketItem[] memory){
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i <totalItemCount; i++){
            if(idToMarketItem[i+1].seller == msg.sender){
                itemCount +=1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].seller == msg.sender){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex +=1;
            }
        }
        return items;
    }

}