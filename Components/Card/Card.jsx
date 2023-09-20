import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imagesNFT from "../Image/index";
import Style from "./Card.module.css";
import images from "../Image/client/index";

const Card = ({ setNotification, image, index }) => {
  return (
    <div className={Style.card}>
      <div className={Style.content}>
        {/* <a href={`/image/1`}> */}
        <a href={`/image/${image.imageID}`}>
          <p>
            <Image
              className={Style.image}
              src={image.image}
              //src={imagesNFT.img1}
              alt="image"
              width={250}
              height={200}
            />
          </p>
        </a>
        <span className={Style.para}>
          <Image
            className="avatar_img"
            //src={images[`client1`]}
            src={images[`client${index + 1}`]}
            width={40}
            height={40}
          />
          <small
            className={Style.para_small}
            onClick={() => (
              setNotification("Successfully copied"),
              navigator.clipboard.writeText(image.owner)
              //navigator.clipboard.writeText("owner copied")
            )}
          >
            {image.owner.slice(0, 25)}...
            {/* 0aakfkasdfnakfkasdlnlksfklnklaskna */}
          </small>
        </span>
        <span>
          CreatedAt:{new Date(image.createdAt * 1000).toDateString()}
          //Jun 15 2023
          <small className={Style.number}>
            #{image.imageID}
            {/* 45 */}
          </small>
        </span>
        <small className={Style.para}>
          {image.description.slice(0, 80)}...
          {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. At
          repellendus enim commodi, eius pariatur ea? */}
        </small>
        <button
          onClick={() => (
            setNotification("Image URL is successfully copied"),
            navigator.clipboard.writeText(image.image)
            //navigator.clipboard.writeText("Image URL is")
          )}
          className={Style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
