// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'; // Correct import for named export

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userIdentify = () => {
      const token = localStorage.getItem("authToken");
      
      if (token) {
        try {
          // Decode the token to get the user details
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.Id; // Adjust the key based on your token's payload

          if (userId) {
            navigate("/dashboard");
          } else {
            navigate("/sign-in");
          }
        } catch (error) {
          console.error("Invalid token:", error);
          navigate("/sign-in"); // If token is invalid, redirect to sign-in
        }
      } else {
        navigate("/sign-in"); // No token found, redirect to sign-in
      }
    };

    userIdentify(); // Call the function to check user identity
  }, [navigate]);

  return (
    <div className=''>
      {/* Add content if needed */}
    </div>
  );
}

export default Home;
