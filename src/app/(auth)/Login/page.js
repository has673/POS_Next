"use client";
import React, { useCallback, useState } from "react";
import Heading from "../../../Components/Heading";
import Heading2 from "../../../Components/Heading2";
import Para from "../../../Components/Para";
import InputField from "../../../Components/InputField";
import Button from "../../../Components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./style.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  setUserData,
} from "../../../redux/slices/userslice";

import Cookies from "js-cookie";
import Head from "next/head";

const Page = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      const { token } = response.data;
      Cookies.set("token", token);
      console.log(token);
      console.log(response.data);

      dispatch(loginSuccess(response.data));
      dispatch(setUserData(await getUser()));
      router.push("/Staff");
    } catch (err) {
      console.log(err);

      dispatch(loginFailure());
    }
  };
  // const getUser = async () => {
  //   try {
  //     const token = Cookies.get("token");
  //     const response = await axios.get(
  //       "http://localhost:4000/auth/userData/get",
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //       }
  //     );
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const getUser = useCallback(async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "http://localhost:4000/auth/userData/get",
        {
          headers: {
            Authorization: token, // Fixed the Authorization header format
          },
        }
      );
      return response.data; // Return the actual data, not the response object
    } catch (err) {
      console.error("Error fetching user data:", err); // Improved error handling
    }
  }, []);
  return (
    <div id="box">
      <Head>
        <title>Login Page</title>
      </Head>
      <Heading text="CYPSOS" />
      <div className="flex flex-col justify-center items-center ">
        <div className="bg-bg h-card w-card1 rounded-4xl text-center rounded-lg">
          <Heading2 text="Login" />
          <Para content="Please enter your credentials below to continue" />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your Username"
            val={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            val={formData.password}
            onChange={handleChange}
          />
          <Link href="/Password">
            <p className="bg-bg text-pink mb-3">Forgot Password?</p>
          </Link>
          <Button title="login" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Page;
