import React from "react";
import Image from "next/image";
import Style from "./Upload.module.css";
import { Delete, UploadIcon, File } from "../SVG/index";

const Upload = ({ onImageChange, display, retrieveFile }) => {
  return (
    <div className={Style.container}>
      <div className={Style.header}>
        {display === null ? (
          <div>
            <UploadIcon />
            <p>Browse File to Upload!</p>
          </div>
        ) : (
          <p>
            <Image
              className={Style.image}
              src={display}
              alt="image"
              width={20}
              height={20}
            />
          </p>
        )}
      </div>
      <label htmlFor="file" className={Style.footer}>
        <File />
        <p>Not selected file</p>
        <Delete />
      </label>
      <input
        id="file"
        onChange={(e) => (onImageChange(e), retrieveFile(e))}
        className={Style.file}
        type="file"
      />
    </div>
  );
};

export default Upload;

// import React from "react";

// const Upload = () => {
//   return <div>Upload</div>;
// };

// export default Upload;
