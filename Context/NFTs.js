import React, { useState, useEffect, useContext, createContext } from "react";
import contractAbi from "./abi.json";
import axios from "axios";
import { ethers, BigNumber } from "ethers";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading, error } = useContract(
    "0x230f27111BF4abaf2845019d697C7a0417912Af4",
    contractAbi
  );

  const address = useAddress();
  const connect = useMetamask();

  console.log(contract);

  //frontend
  const disconnect = useDisconnect();
  const signer = useSigner();

  const [userBalance, setUserBalance] = useState();
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    try {
      //user balance
      const balance = await signer?.getBalance();
      const userBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";

      setUserBalance(userBalance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Contract function

  //upload image

  const UploadImage = async (imageInfo) => {
    const { title, description, email, category, image } = imageInfo;
    try {
      //charge
      const listingPrice = await contract.call("listingPrice");
      const createNFTs = await contract.call(
        "uploadIPFS",
        [address, image, title, description, email, category],
        {
          value: listingPrice.toString(),
        }
      );

      //api call
      const response = await axios({
        method: "POST",
        url: `/api/v1/NFTs`,
        data: {
          title: title,
          description: description,
          category: category,
          image: image,
          address: address,
          email: email,
        },
      });
      console.log(response);
      console.info("contract call success", createNFTs);

      setloading(false);
      window.location.reload();
    } catch (error) {
      console.error("contract call failure", error);
    }
  };

  //Get contract data

  const getUploadedImages = async () => {
    //all images
    const images = await contract.call("getAllNFTs");
    //total upload
    const totalUpload = await contract.call("imagesCount");
    //listing price
    const listingPrice = await contract.call("listingPrice");
    const allImages = images.map((images, i) => ({
      owner: images.creator,
      title: images.title,
      description: images.description,
      email: images.email,
      category: images.category,
      fundraised: images.fundraised,
      image: images.image,
      imageID: images.id.toNumber(),
      createdAt: images.timestamp.toNumber,
      listingAmount: ethers.utils.formatEther(listingPrice.toString()),
      totalUpload: totalUpload.toNumber(),
    }));
    return allImages;
  };

  //get Single Image
  const singleImage = async (id) => {
    try {
      const data = await contract.call("getImage", [id]);
      const image = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundRaised: ethers.utils.formatEther((data[4]).toString()),        
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageId: data[8].toNumber(),
      };
      return image;
    } catch (error) {
      console.log(error);
    }
  };

  //donate
  const donateFund = async ({ amount, Id }) => {
    try {
      console.log(amount, Id);
      const transaction = await contract.call("donateToImage", [Id], {
        value: amount.toString(),
      });
      console.log(transaction);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //get api data
  const getAllNftsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: `/api/v1/NFTs`,
    });
    console.log(response);
  };

  //single Nfts api
  const getSingleNftsAPI = async (id) => {
    const response = await axios({
      method: "GET",
      url: `/api/v1/NFTs/${id}`,
    });
    console.log(response);
  };

  return (
    <StateContext.Provider
      value={{
        //contract
        address,
        contract,
        connect,
        disconnect,
        userBalance,
        setloading,
        loading,
        //functions
        UploadImage,
        getUploadedImages,
        donateFund,
        singleImage,
        //Api
        getAllNftsAPI,
        getSingleNftsAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
