import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Button,
  Logo,
  Card,
  Footer,
  CheckBox,
  Filter,
  Donate,
  Form,
  Notification,
  Profile,
  Login,
  Header,
  SignUp,
  Upload,
  Product,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Home = () => {
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance,
    UploadImage,
    getUploadedImages,
    setloading,
    loading,
    getAllNftsAPI,
  } = useStateContext();

  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(true);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);

  //GET data
  const oldImages = [];
  const fetchImages = async () => {
    const images = await getUploadedImages();
    setAllImages(images);
    //api nfts
    const apiImages = await getAllNftsAPI();
  };

  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  if (allImages.length == 0) {
    console.log("Loading");
  } else {
    allImages.map((el) => oldImages.push(el));
  }

  //image data
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  //Upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(false);
    setloading(true);
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `af56bbf044622603792d`,
            pinata_secret_api_key: `140d9a4a5744a6903cde0e91c798d2bfad8016c2aa770a300e815af1c808b0ca`,
            "Content-Type": "multipart/form-data",
          },
        });
        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        await UploadImage({
          ...imageInfo,
          image: image,
          category: category,
        });
        setFile(null);
      } catch (error) {
        console.log(error);
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  //take iamge
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 500 NFTs for free</h1>
      </div>
      {/* Upload */}
      <div className="upload">
        <Upload
          onImageChange={onImageChange}
          display={display}
          address={address}
          retrieveFile={retrieveFile}
        />
        <div className="upload-info">
          <h1>Welcome to NfTs IPFS upload</h1>
          <p>OUt products help you securely distribute any type of media</p>
          <div className="avatar">
            <Button
              address={address}
              disconnect={disconnect}
              connect={connect}
              file={file}
            />
            {address && (
              <p>
                <Image
                  className="avatar_img"
                  src={images.client1}
                  width={40}
                  height={40}
                  onClick={() => setOpenProfile(true)}
                />
              </p>
            )}
          </div>
        </div>
      </div>
      <h1 className="subheading">All NFTs of Marketplace</h1>
      {/* CARD */}
      {allImages.length == 0 ? (
        <Logo />
      ) : allImages == undefined ? (
        <h1>NoImges</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}
      <Footer />

      {/* NOTIFication */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* Profile */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance}
            address={address}
          />
        </div>
      )}
      {/* Loader */}
      {loading && (
        <div className="loader">
          <Logo />
        </div>
      )}
      {file && closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
