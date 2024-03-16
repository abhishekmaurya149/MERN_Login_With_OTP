import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../services/Apis";
import {NavLink, useNavigate} from 'react-router-dom'
import "../style/mix.css";

const Register = () => {
  const [passhow, setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;
  
    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password length should be minimum 6 characters");
    } else {
        const response = await registerfunction(inputdata);
        if (response.status ===200 ){
          setInputdata({...inputdata,fname:"",email:"",password:""});
          navigate("/")
        }else{
          toast.error(response.response.data.error);
        }

      // try {
      //   // Assuming the response object contains success/failure information
      //   if (response && response.success) {
      //     // Handle success scenario - redirect or show success message
      //     toast.success("Registration successful!");
      //   } else {
      //     // Handle registration failure - show error message
      //     toast.error("Registration failed. Please try again.");
      //   }
      // } catch (error) {
      //   // Handle registration failure - show error message
      //   console.error("Registration failed:", error);
      //   toast.error("Registration failed. Please try again.");
      // }
    }
  };
  

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage your
              tasks! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={passhow ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {passhow ? "Hide" : "Show"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>Already have an account <NavLink to='/'>Login</NavLink></p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
