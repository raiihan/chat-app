
const Login = () => {
    return(
        <>
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Simple Chat</span>
                <span className="title">Login</span>
                <form>
                    
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    
                    <button>Login</button>
                </form>
                <p>You do have an account? Register</p>
            </div>
        </div>
        </>
    )
}

export default Login;