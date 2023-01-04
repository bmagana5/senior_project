const Signup = ({ submitForm, toggleUserForm, usernameInputHandler, fullNameInputHandler, emailInputHandler, passwordInputHandler, confirmPasswordInputHandler, usernameField, fullNameField, emailField, passwordField, confirmPasswordField }) => {
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

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
            <form className='bg-white rounded border d-flex flex-column justify-content-center p-4' style={formStyling} onSubmit={submitForm}>
                <h2 className='px-2' style={formSignUpHeader}>Sign Up</h2>
                <p className="px-2 mb-1">It's quick and easy.</p>
                <hr/>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="username" className='mb-2'><strong>Username</strong></label>
                    <input name="username" className='py-2 px-3 rounded login-input-field' value={usernameField} style={inputStyling} onChange={usernameInputHandler} placeholder="Enter username" required></input>
                </div>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="fullname" className='mb-2'><strong>Full Name</strong></label>
                    <input name="fullname" className='py-2 px-3 rounded login-input-field' value={fullNameField} style={inputStyling} onChange={fullNameInputHandler} placeholder="Enter full name" required></input>
                </div>
                <div className='d-grid px-2 mb-2'>
                    <label htmlFor="email" className='mb-2'><strong>Email</strong></label>
                    <input name="email" className='py-2 px-3 rounded login-input-field' value={emailField} style={inputStyling} onChange={emailInputHandler} placeholder="Enter email address" required></input>
                </div>
                <div className="d-flex px-2 mb-2 w-100">
                    <div className='d-flex flex-column me-2 w-50'>
                        <label htmlFor="signup-password" className='mb-2'><strong>Password</strong></label>
                        <input name="signup-password" type="password" className='py-2 px-3 rounded login-input-field' value={passwordField} style={inputStyling} onChange={passwordInputHandler} placeholder="Enter password" required></input>
                    </div>
                    <div className='d-flex flex-column w-50'>
                        <label htmlFor="password-confirm" className='mb-2'><strong>Confirm Password</strong></label>
                        <input name="password-confirm" type="password" className='py-2 px-3 rounded login-input-field' value={confirmPasswordField} style={inputStyling} onChange={confirmPasswordInputHandler} placeholder="Confirm password" required></input>
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
    );
};

export default Signup;