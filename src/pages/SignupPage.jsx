// src/pages/SignupPage.jsx
import React from "react";
import AuthModal from "../components/AuthModal";

const SignupPage = () => {
  return <AuthModal mode="signup" open={true} onClose={() => { /* optional */ }} />;
};

export default SignupPage;
