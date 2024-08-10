import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDecodedJWT from "@/hooks/useDecodedJWT/useDecodedJWT"

const fetchData = async () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access");

  if ( accessToken) {
   
    localStorage.setItem('accessToken', accessToken);
   
    return true; // tokens are successfully set
  }
  return false; // tokens are not set
};

const Redirect = () => {
  const navigate = useNavigate();
  let token = localStorage.getItem('accessToken');
  const decodedToken = useDecodedJWT(token);
  const id = decodedToken?.sub;

  // useEffect(() => {
  //   const redirectAfterFetch = async () => {
  //     const success = await fetchData();

  //     if (decodedToken) {
  //       // If decodedToken is present, fetch user data after a 1-second delay

  //       try {
  //         if (id !== null) {
  //           const getUserData = await getMember(id);
  //           localStorage.setItem("homeUrl", getUserData.data.username); // Set accessToken in local storage

  //           if (success && !getUserData.data.username) {
  //             navigate("/login/validation");
  //           } else {

  //             const prevUrl = localStorage.getItem("prevUrl");
  //             if (prevUrl) {
  //               window.location.assign(prevUrl);
  //               localStorage.removeItem("prevUrl");
  //             } else {
  //               setTimeout(() => {
  //                 navigate(`/user/${getUserData.data.username}`);
  //                 setTimeout(() => {
  //                 }, 500);
  //               }, 1000);
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching member:", error);
  //       }
  //     } else {
  //       console.error("Decoded token is not present");
  //     }
  //   };

  //   redirectAfterFetch();
  // }, [navigate, setCookie, decodedToken, dispatch, id]);

  return (<h2 className={"text-white"}>로그인중입니다....</h2>);
};

export default Redirect;