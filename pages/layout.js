import React from "react";
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

const layout = () => {
  return (
    <div className="home">
      <p>Header</p>
      <Header />
      <p>Upload</p>
      <Upload />
      <p>BUTTON</p>
      <Button />
      <p>Filter</p>
      <Filter />
      <p>Notification</p>
      <Notification />
      <p>CARD</p>
      <Card />
      <p>DONate</p>
      <Donate />
      <p>Footer</p>
      <Footer />
      <p>Checkbox</p>
      <CheckBox />
      <p>FORM</p>
      <Form />
      <p>Login</p>
      <Login />
      <p>Signup</p>
      <SignUp />
      <p>Profile</p>
      <Profile />
      <p>Product</p>
      <Product />
    </div>
  );
};

export default layout;
