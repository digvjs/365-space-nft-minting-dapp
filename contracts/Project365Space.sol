// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Project365Space is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private tokenIdsCounter;

    string public baseURI;  // Base URI for json files
    string public baseExtension = ".json";  // extension for tokenURI files
    uint256 public cost = 0.1 ether;    // Cost per NFT
    uint256 public maxSupply = 5110;
    uint256 public maxMintAmount = 20;  // Maximum number of tokens can be minted in single transaction
    uint256 public maxForAccount = 20;  // Maximum number of tokens an account can mint
    bool public paused = false;
    bool public isSaleActive = false;

    constructor(
        string memory _initBaseURI
    ) ERC721("365 Space Project", "SPACE") {
        setBaseURI(_initBaseURI);
    }

    // internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    // public
    function mint(address _to, uint256 _mintAmount) public payable {
        uint256 supply = totalSupply();
        require(!paused, "Contract paused!");
        require(_to != address(0), "_to address cannot be dead address!");
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount, "_mintAmount exceeds max maxMintAmount!");
        require(supply.add(_mintAmount) <= maxSupply, "MaxSupply exceeding!");

        if (msg.sender != owner()) {
            require(isSaleActive, "Sale is inactive");
            require(msg.value >= cost.mul(_mintAmount), "Not enough ethers sent to mint NFTs!");

            uint256 userBalance = balanceOf(_to);
            require(userBalance.add(_mintAmount) <= maxForAccount, "Account balance exceeds allowed minting quantity");
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            tokenIdsCounter.increment();
            _safeMint(_to, tokenIdsCounter.current());
        }
    }

    /**
     * @dev get tokenIds of _account address
     */
    function walletOfOwner(address _account)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_account);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_account, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();

        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension)
                )
                : "";
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);

        require(!paused, "ERC721Pausable: token transfer while paused");
    }

    //only owner
    function setCost(uint256 _newCost) public onlyOwner() {
        cost = _newCost;
    }

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner() {
        maxMintAmount = _newmaxMintAmount;
    }

    function setmaxForAccount(uint256 _newMaxForAccount) public onlyOwner() {
        maxForAccount = _newMaxForAccount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function setIsSaleActive(bool _state) public onlyOwner {
        isSaleActive = _state;
    }

    /**
     * @dev Withdraw ethers available on contract to the callers address
     */
    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}