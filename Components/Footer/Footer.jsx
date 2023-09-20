// import React from "react";
// import { RiSendPlaneFill } from "react-icons/ri";
// import {
//   TiSocialFacebook,
//   TiSocialLinkedin,
//   TiSocialTwitter,
//   TiSocialYoutube,
//   TiSocialInstragram,
// } from "react-icons/ti";
// import { Logo } from "../index";
// import Style from "./Footer.module.css";

// const Footer = () => {
//   const menuList = ["Home", "About", "Product", "Contact", "ICO", "Membership"];
//   return (
//     <div className={Style.footer}>
//       <div className={Style.footer_box}>
//         <div className={Style.footer_box_social}>
//           <a href="/">
//             <Logo className={Style.footer_box_social_logo} />
//           </a>
//           <p className={Style.footer_box_social_info}>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
//             magni ut dolor quidem voluptatem ipsam, eveniet totam nisi soluta
//             aut.
//           </p>
//           <div className={Style.footer_social}>
//             <a href="#">
//               <TiSocialFacebook />
//             </a>
//             <a href="#">
//               <TiSocialInstragram />
//             </a>
//             <a href="#">
//               <TiSocialYoutube />
//             </a>
//             <a href="#">
//               <TiSocialTwitter />
//             </a>
//             <a href="#">
//               <TiSocialLinkedin />
//             </a>
//           </div>
//         </div>
//         <div className={Style.footer_box_help}>
//           <h3>Help Center</h3>
//           <div className={Style.menu}>
//             {menuList.map((el, i) => (
//               <p key={i + 1}>{el}</p>
//             ))}
//           </div>
//         </div>
//         <div className={Style.subscribe}>
//           <h3>Subscribe</h3>
//           <div className={Style.subscribe_box}>
//             <input type="email" placeholder="enter your email address" />
//             <RiSendPlaneFill className={Style.subscribe_box_send} />
//           </div>
//           <div className={Style.subscribe_box_info}>
//             <p>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
//               quia maxime sit corrupti enim!
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti";
import { Logo } from "../index";
import Style from "./Footer.module.css";

const Footer = () => {
  const menuList = ["Home", "About", "Product", "Contact", "ICO", "Membership"];
  return (
    <>
      <div className={Style.footer}>
        <div className={Style.footer_box}>
          <div className={Style.footer_box_social}>
            <a href="/">
              <Logo className={Style.footer_box_social_logo} />
            </a>
            <p className={Style.footer_box_social_info}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              magni ut dolor quidem voluptatem ipsam, eveniet totam nisi soluta
              aut.
            </p>
            <div className={Style.footer_social}>
              <a href="#">
                <TiSocialFacebook />
              </a>
              <a href="#">
                <TiSocialYoutube />
              </a>
              <a href="#">
                <TiSocialTwitter />
              </a>
              <a href="#">
                <TiSocialLinkedin />
              </a>
            </div>
          </div>
          <div className={Style.footer_box_help}>
            <h3>Help Center</h3>
            <div className={Style.menu}>
              {menuList.map((el, i) => (
                <p key={i + 1}>{el}</p>
              ))}
            </div>
          </div>
          <div className={Style.subscribe}>
            <h3>Subscribe</h3>
            <div className={Style.subscribe_box}>
              <input type="email" placeholder="enter your email address" />
              <RiSendPlaneFill className={Style.subscribe_box_send} />
             
            </div>
            <div className={Style.subscribe_box_info}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                quia maxime sit corrupti enim!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
