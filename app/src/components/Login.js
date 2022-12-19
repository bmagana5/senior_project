const Login = ({submitForm, setGoToSignUpForm, usernameInputHandler, passwordInputHandler}) => {
    const loginButtonStyle = {
        backgroundImage: 'linear-gradient(to right, rgb(167, 169, 173), rgb(79, 83, 83))',
        fontSize: '14pt',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
    }

    const inputStyling = { 
        color: '#495057', 
        border: '1px solid #ced4da', 
        outline: 'none' 
    };

    const formStyling = { 
        width: '400px', 
        userSelect: 'none', 
        boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)', 
        fontFamily: 'Helvetica Neue, sans-serif' 
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='display-5 pb-2' style={{ fontFamily: "YellowTail, cursive" }}>Social Media Project</h1>
            <form className='bg-white rounded border d-grid py-3 px-4' style={formStyling} onSubmit={submitForm}>
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-center px-1 mt-2 mb-3'>
                        <h5 className='fw-normal m-0'>Log Into Your Account</h5>
                    </div>
                    <div className='d-grid px-2 mb-3'>
                        <label htmlFor="login-userfield" className='mb-2'><strong>Username or Email</strong></label>
                        <input name="login-userfield" className='py-2 px-3 rounded login-input-field' style={inputStyling} onChange={usernameInputHandler} placeholder='Enter username or email' required/>
                    </div>
                    <div className='d-grid px-2 mb-3'>
                        <label htmlFor="login-password" className='mb-2'><strong>Password</strong></label>
                        <input name="login-password" className='py-2 px-3 rounded login-input-field' style={inputStyling} onChange={passwordInputHandler} placeholder='Enter password' type='password' required/>
                    </div>
                    <div className='d-grid px-2 my-3'>
                        <button className='rounded text-white login-input-button m-0 py-1 px-3' style={loginButtonStyle} type='submit'><strong>Log In</strong></button>
                    </div>
                    <div className='d-flex justify-content-center px-1 mb-2'>
                        <span onClick={setGoToSignUpForm} className='text-decoration-none'
                            style={{ color: '#007bff', fontSize: '10pt', cursor: 'pointer' }}
                        >Don't have an account? Sign up here.</span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;