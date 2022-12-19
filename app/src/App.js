import './App.css';
import Login from  "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";


function App() {
  const [loginSignupToggle, setLoginSignupToggle] = useState(true);
  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const validateForm = (event) => {
    event.preventDefault();
    console.log('validating form...');
    console.log(usernameField, passwordField);

    // call backend server...
    // do a POST request
    //    axios.post(url, data).then()
  };
  
  const captureUsernameInput = (event) => {
    setUsernameField(event.target.value);
  };

  const capturePasswordInput = (event) => {
    setPasswordField(event.target.value);
  };

  const toggleUserForm = () => {
    setLoginSignupToggle(loginSignupToggle ? false : true);
  }

  return ( 
    <>
      <div className="w-100 d-flex justify-content-center align-items-center" id="app-container" style={{ backgroundColor: '#ebedf0', height: '85%' }}>
        {loginSignupToggle 
          ? <Login 
              submitForm={validateForm} 
              setGoToSignUpForm={toggleUserForm}
              usernameInputHandler={captureUsernameInput}
              passwordInputHandler={capturePasswordInput}
            /> 
          : <Signup 
              setGoToLogInForm={toggleUserForm}
            />}
      </div>
      <div className="bg-white w-100 " style={{ height: '15%' }}>
          <p className='mx-5 text-secondary fs-6'>Social Media Project © 2020</p>
      </div>
    </>
  );
}

export default App;
