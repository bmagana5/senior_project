import '../css/fonts.css';


const Login = () => {
    const mainDiv = {
        backgroundColor: '#ebedf0',
        padding: '80px 0px 60px',
        overflow: 'auto'
    }
    
    const titleHeader = {
        margin: 'auto',
        fontFamily: 'YellowTail, cursive',
        textAlign: 'center',
        fontSize: '2.5em',
        fontWeight: '500',
        paddingBottom: '20px'
    }

    const formContainer = {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        margin: 'auto',
        width: '400px',
        /* height: 375px; */
        padding: '20px 15px',
        userSelect: 'none',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        fontFamily: 'Helvetica Neue, sans-serif',
        boxSizing: 'border-box'
    }

    const smallHeader = {
        margin: '0px',
        textAlign: 'center',
        fontSize: '1.25rem',
        fontWeight: '500'
    }

    const formLayout = { 
        maxWidth: '100%', 
        margin: '0 auto',           // no y margins, auto x margins
        display: 'flex',            // make its children elements 'flexible' in a grid layout manner; prevents annoying margin collapse
        flexDirection: 'column'     // they will stack neatly vertically, top to bottom
    } 

    const formItem = {
        padding: '0 0.5rem',
        marginBottom: '1rem',
        boxSizing: 'border-box'
    }

    const inputStyle = {
        display: 'block',               //  we want these on their own line
        width: '100%',                  //  full width of their parent container
        height: '2.25rem',
        maxWidth: '100%',               //  cap width at the max width of parent
        margin: '0 auto',               //  no margins on y, auto on x
        padding: '0.375rem 0.75rem',
        boxSizing: 'border-box',        //  ensures that padding is included in height & width
        boxShadow: 'none',              // this doesn't seem to do anything... not showing up in inspector...
        border: '1px solid #ced4da', 
        backgroundClip: 'padding-box',  //  make these elements include padding in width and height
        borderRadius: '0.25rem',        // round out the corners of the element
        fontSize: '1rem',
        color: '#495057'
    }

    const loginButtonStyle = {
        backgroundImage: 'linear-gradient(to right, rgb(167, 169, 173), rgb(79, 83, 83))',
        borderRadius: '0.4rem',
        color: 'white',
        fontSize: '14pt',
        padding: '6px 16px',
        margin: '0',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        opacity: '0.8',
        outline: 'none',
    }

    const signUpFormLink = {
        color: '#007bff',
        fontSize: '10pt',
        textDecoration: 'none'
    }

    return (
        <div style={mainDiv}>
            <h1 style={titleHeader}>Social Media Project</h1>
            <form style={formContainer}>
                <div style={formLayout}>
                    <div style={formItem}>
                        <h5 style={smallHeader}>Log Into Your Account</h5>
                    </div>
                    <div style={formItem}>
                        <label style={{display: 'block', marginBottom: '0.5rem'}}><strong>Username or Email</strong></label>
                        <input style={inputStyle} placeholder='Enter username or email'/>
                    </div>
                    <div style={formItem}>
                        <label style={{display: 'block', marginBottom: '0.5rem'}}><strong>Password</strong></label>
                        <input style={inputStyle} placeholder='Enter password'/>
                    </div>
                    <div style={{...formItem, marginTop: '1rem'}}>
                        <button style={loginButtonStyle}><strong>Log In</strong></button>
                    </div>
                    <div style={{...formItem, textAlign: 'center'}}>
                        <a style={signUpFormLink} href='#'>Don't have an account? Sign up here.</a>
                    </div>
                </div>
            </form>
        </div>


    );
};

export default Login;