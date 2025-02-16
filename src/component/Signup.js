import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { alertContext } from "../context/Alert/AlertContext";  //----alert
import { useDispatch } from 'react-redux'
import  {actionCreator} from '../state/index'
import { bindActionCreators } from 'redux'
import "./Style.css"
const Signup = () => {
// const {toSetAlerts}=useContext(alertContext);   // ----alert
const dispatch = useDispatch();
const { alertAction } = bindActionCreators(actionCreator, dispatch);


  let navigate = useNavigate();
  const host = "http://localhost:5000"
  const [loginForm, setLoginForm] = useState({
    name: "",
    email: "",
    cpassword: "",
    password:""
  });

  // const [password,setPassword]=useState("");

  const loginFormChange = (e) => {
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [e.target.name]: [e.target.value].toString(),
      };
    });
  };

  const handleSubmit= async (e)=>{
    e.preventDefault();
   const {email,password,name}=loginForm;
    if((loginForm.cpassword)===loginForm.password){
      try {
        const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
         
          },
          body: JSON.stringify({email,password,name})
        });
        const data = await response.json();
        if (response.status === 200) {
  
        localStorage.setItem("token",data.authtoken);

         navigate(`/`);
        //  toSetAlerts("visible","Success fully signup","success")    //...alert
         alertAction({
          display:"visible",
          message:"Success fully signup",
          type:"success"
        })    //...alert
         return;
          
        }else{
          // toSetAlerts("visible","Enter Valid Credentials","warning")    //...alert
          alertAction({
            display:"visible",
            message:"Enter Valid Credentials",
            type:"warning"
          })    //..
        }
        
  
        } catch (err) {
            // alert("Enter Valid Credentials error")
        //  toSetAlerts("visible","Some Error ocurred try letter","danger")    //...alert
         alertAction({
          display:"visible",
          message:"Some Error ocurred try letter",
          type:"danger"
        })    //..


        console.error(err);
        }
    }else{
      // toSetAlerts("visible","password not match","warning")    //...alert
      alertAction({
        display:"visible",
        message:"password not match",
        type:"warning"
      })    //..

    }

  }
  return (
    <div className={"container signUp-container  "} >
    


    <h1 className={"text-center my-2 login_signupForm"} >Sign Up</h1>
     <div className="form-signUp my-2" >
    <form onSubmit={(e)=>{
      handleSubmit(e)
  }}>
    <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
           minLength={3} required
            type="text"
            className="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelp"
            value={loginForm.name}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
    </div>
    <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
          required
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            value={loginForm.email}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            minLength={8} required
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
           minLength={8} required
          disabled={loginForm.password.length<8}
            type="password"
            className="form-control"
            name="cpassword"
            id="cpassword"
            value={loginForm.cpassword}
            onChange={(e) => {
              loginFormChange(e);
            }}
          />
        </div>
       
   
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
  </form>
  </div>
    </div> );
};

export default Signup;
