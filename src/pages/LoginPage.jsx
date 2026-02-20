// src/pages/LoginPage.jsx
import React, { useState } from "react";
import AuthModal from "../components/AuthModal";

const LoginPage = () => {
  // show modal in page mode: open true and mode login
  return <AuthModal mode="login" open={true} onClose={() => { /* if you want navigate away, handle in App */ }} />;
};

export default LoginPage;
