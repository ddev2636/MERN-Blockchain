// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable contractOwner =
        payable(0xdC27a253483cf474fe902808E4Be0cA1aF570562);
    uint256 public listingPrice = 0.025 ether;

    struct NFTs {
        string title;
        string description;
        string email;
        string category;
        address payable creator;
        string image;
        uint256 timestamp;
        uint256 id;
        uint256 fundraised;
    }

    mapping(uint256 => NFTs) public nftImages;

    uint256 public imagesCount = 0;

    function uploadIPFS(
        address payable _creator,
        string memory _image,
        string memory _title,
        string memory _description,
        string memory _email,
        string memory _category
    )
        public
        payable
        returns (
            string memory,
            string memory,
            string memory,
            address payable,
            string memory
        )
    {
        imagesCount++;
        NFTs storage nft = nftImages[imagesCount];

        nft.title = _title;
        nft.creator = _creator;
        nft.description = _description;
        nft.email = _email;
        nft.category = _category;
        nft.image = _image;
        nft.timestamp = block.timestamp;
        nft.id = imagesCount;

        return (_title, _description, _category, _creator, _image);
    }

    function getAllNFTs() public view returns (NFTs[] memory) {
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentId = i + 1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function getImage(
        uint256 id
    )
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address payable,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        NFTs memory nfts = nftImages[id];
        return (
            nfts.title,
            nfts.description,
            nfts.email,
            nfts.category,
            nfts.creator,
            nfts.timestamp,
            nfts.image,
            nfts.id,
            nfts.fundraised // Include fundraised in the return
        );
    }

    // Update the listing price
    function updateListingPrice(
        uint256 _listingPrice,
        address owner
    ) public payable {
        require(
            contractOwner == owner,
            "Only contract owners can update listing price"
        );
        listingPrice = _listingPrice;
    }

    // Donate function
    function donateToImage(uint256 _id) public payable {
        uint256 amount = msg.value;
        NFTs storage nft = nftImages[_id];

        (bool sent, ) = nft.creator.call{value: amount}("");

        if (sent) {
             nft.fundraised = nft.fundraised + amount;
        }
    }

    function withdraw(address owner) external {
        require(owner == contractOwner, "Only contract owners can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");
        contractOwner.transfer(balance);
    }
}
