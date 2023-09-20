import React from "react";
import { FormSVG } from "../SVG/index";
import Style from "./Donate.module.css";

const Donate = ({ setDonate, setSupport, donateAmount, setloading }) => {
  return (
    <div className={Style.card}>
      <div className={Style.card2}>
        <form className={Style.form}>
          <p id="heading" className={Style.heading}>
            Support the creator
          </p>
          <div className={Style.field}>
            <FormSVG styleClass={Style.input_icon} />
            <input type="number" className={Style.input_field} placeholder="amount 0.025" autoComplete="off" 
            min={0.025}
            onChange={(e)=>setSupport(e.target.value)}/>
          </div>
          <div className={Style.btn}>
            <button className={Style.button1} 
            onClick={()=>setDonate(false)}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
              <button className={Style.button2}>Sign Up</button>
          </div>
          <button className={Style.button3}
          onClick={()=>(setloading(true),donateAmount(),setDonate(false))}>
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donate;
