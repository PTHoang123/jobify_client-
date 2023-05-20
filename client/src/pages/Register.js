import React from "react";
import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import {useNavigate} from 'react-router-dom';
const initalState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
function Register() {
  const [values, setValues] = useState(initalState);
  const navigate = useNavigate()
  const {user ,isLoading , showAlert, displayAlert, clearAlert, registerUser, loginUser, logoutUser} = useAppContext()
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({...values, [e.target.name] : e.target.value })
    console.log(e.target.name);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values
    if( (!isMember && !name) || !email || !password){
      displayAlert()
    } 
    const currentUser =  {name, email , password}
    if(isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
  };
useEffect(() => {
  if(user) {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }
},[user])
  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
        <FormRow
          type="text"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yes?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
