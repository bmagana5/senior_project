import { useState, useContext } from "react";

import loginService from '../../services/loginService';
import signupService from '../../services/signupService';
import { UserContext } from "../../contexts/user.context";
import { ErrorMessageContext } from "../../contexts/error-message.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
    username: '', 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: ''
};

const Signup = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, fullName, email, password, confirmPassword } = formFields;
    const [loginSignupToggle, setLoginSignupToggle] = useState(false);
    const [toggleUserEmailFields, setToggleUserEmailFields] = useState(true);

    // create a user context hook and save signup/login user data there
    const {setUserData} = useContext(UserContext);
    const { setErrorMessage } = useContext(ErrorMessageContext);


    const formSignUpHeader = {
        margin: '0',
        fontFamily: 'Yellowtail, cursive',
        fontSize: '2rem',
        fontWeight: '500',
        lineHeight: '1.2'
    };

    const signupButtonStyle = {
        backgroundImage: 'linear-gradient(to right, rgb(167, 169, 173), rgb(79, 83, 83))',
        fontSize: '14pt',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
    };

    const inputStyling = { 
        color: '#495057', 
        border: '1px solid #ced4da', 
        outline: 'none' 
    };

    const formStyling = { 
        maxWidth: '80%',
        maxHeight: '80%',
        userSelect: 'none', 
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', 
        fontFamily: 'Helvetica Neue, sans-serif' 
    };

    const validateForm = (event) => {
        event.preventDefault();
        // if a field is not '', check that it has valid data
        // ensure username is long enough and is of valid chars
        // check that password is long enough
        // check that email is valid
        // check that full name is valid as well.
        loginSignupToggle 
          ? signup() 
          : login();
    };
    
    const login = async () => {
        // check login fields
        const userObj = {
          password
        };
        toggleUserEmailFields
          ? userObj.username = username
          : userObj.email = email;
        try {
          const user = await loginService.login(userObj.username ? 'username' : 'email', userObj);
          clearAllFormFields();
          setUserData(user);
        } catch (error) {
          setErrorMessage(`Login failed: ${error.response.data.error}`);
          setTimeout(() => {
            clearErrorMessage();
          }, 10000);
          clearAllFormFields();
        }
    };
    
    const signup = async () => {
        if (password !== confirmPassword) {
          setErrorMessage('Sign up failed: Passwords do not match');
          setTimeout(() => setErrorMessage(''), 10000);
          clearAllFormFields();
          return;
        }
    
        try {
          const newUser = await signupService.signup(formFields);
          if (newUser && newUser.username === username) {
            login();
          }
        } catch(error) {
          setErrorMessage(`Signup Failed: ${error.response.data.error}`);
          setTimeout(() => {
            clearErrorMessage();
          }, 10000);
          clearAllFormFields();
        }
    };

    const clearErrorMessage = () => {
        setErrorMessage('');
    };
    
    const clearAllFormFields = () => {
        setFormFields(defaultFormFields);
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    
    const toggleUserForm = () => {
        clearAllFormFields();
        setLoginSignupToggle(loginSignupToggle ? false : true);
    };

    // inner component: not best practices, but IT JUST WORKS
    const Login = () => {
        const changeUserEmailField = () => {
            setToggleUserEmailFields(!toggleUserEmailFields);
        };

        return (
            <div className="login-form-container">
                <h1>Social Media Project</h1>
                <form className='needs-validation' onSubmit={validateForm}>
                    <div className='form-container'>
                        <div className='form-header'>
                            <h5>Log Into Your Account</h5>
                        </div>
                        <div className='username-field-container'>
                            <label htmlFor={`${toggleUserEmailFields ? 'username' : 'email'}`}>
                                <strong>{toggleUserEmailFields ? 'Username' : 'Email'}</strong>
                            </label>
                            <input type={`${toggleUserEmailFields ? 'text' : 'email'}`} 
                                name={`${toggleUserEmailFields ? 'username' : 'email'}`} 
                                value={`${toggleUserEmailFields ? username : email}`} 
                                onChange={handleChange} 
                                placeholder={`${toggleUserEmailFields ? 'Enter username' : 'Enter email'}`} 
                                required/>
                            <div className="valid-feedback">Looks good!</div>
                            <div className="invalid-feedback">Please double check {toggleUserEmailFields ? 'username' : 'email'} field.</div>
                        </div>
                        {/* toggle user/email checkbox */}
                        <div className="toggle-container">
                            <input type="checkbox" value="" id="flexCheckDefault" onChange={changeUserEmailField}/>
                            <label className="fw-lighter text-secondary" htmlFor="flexCheckDefault">Use email?</label>
                        </div>
                        {/* password field */}
                        <div className='password-container'>
                            <label htmlFor="password">
                                <strong>Password</strong>
                            </label>
                            <input name="password" 
                                type='password' 
                                className='py-2 px-3 rounded login-input-field' 
                                value={password} 
                                onChange={handleChange} 
                                placeholder='Enter password' 
                                required/>
                            {
                                password.length > 0 && <div className="valid-feedback">Looks good!</div>
                            }
                            {
                                password.length > 0 && <div className="invalid-feedback">Please double check the password field.</div>
                            }
                        </div>
                        <div className='button-container'>
                            <button type='submit'>
                                <strong>Log In</strong>
                            </button>
                        </div>
                        <div className='sign-up-link-container'>
                            <span onClick={toggleUserForm} 
                                className='text-decoration-none'>
                                    Don't have an account? Sign up here.
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    return (
        loginSignupToggle ?
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <form className='bg-white rounded border d-flex flex-column justify-content-center p-4' style={formStyling} onSubmit={validateForm}>
                <h2 className='px-2' style={formSignUpHeader}>Sign Up</h2>
                <p className="px-2 mb-1">It's quick and easy.</p>
                <hr/>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="username" className='mb-2'><strong>Username</strong></label>
                    <input name="username" className='py-2 px-3 rounded login-input-field' value={username} style={inputStyling} onChange={handleChange} placeholder="Enter username" required></input>
                </div>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="fullName" className='mb-2'><strong>Full Name</strong></label>
                    <input name="fullName" className='py-2 px-3 rounded login-input-field' value={fullName} style={inputStyling} onChange={handleChange} placeholder="Enter full name" required></input>
                </div>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="email" className='mb-2'><strong>Email</strong></label>
                    <input name="email" className='py-2 px-3 rounded login-input-field' value={email} style={inputStyling} onChange={handleChange} placeholder="Enter email address" required></input>
                </div>
                <div className="d-flex px-2 mb-2 w-100">
                    <div className='d-flex flex-column me-2 w-50'>
                        <label htmlFor="password" className='mb-2'><strong>Password</strong></label>
                        <input name="password" type="password" className='py-2 px-3 rounded login-input-field' value={password} style={inputStyling} onChange={handleChange} placeholder="Enter password" required></input>
                    </div>
                    <div className='d-flex flex-column w-50'>
                        <label htmlFor="confirmPassword" className='mb-2'><strong>Confirm Password</strong></label>
                        <input name="confirmPassword" type="password" className='py-2 px-3 rounded login-input-field' value={confirmPassword} style={inputStyling} onChange={handleChange} placeholder="Confirm password" required></input>
                    </div>
                </div>
                <div className="d-grid px-2 my-3" >
                    <button className="rounded text-white login-input-button m-0 py-1 px-3" style={signupButtonStyle}><strong>Sign Up</strong></button>
                </div>
                <div className='d-flex justify-content-center px-1 mb-2'>
                    <span onClick={toggleUserForm} className='text-decoration-none'
                        style={{ color: '#007bff', fontSize: '12pt', cursor: 'pointer' }}
                    >Already have an account? Log in here.</span>
                </div>
            </form>
        </div>
        : Login()
    );
};

export default Signup;