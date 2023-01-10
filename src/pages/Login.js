import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
const Login = () => {

    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
            setError(false)
        } catch (error) {
            setError(true)
        }
    }
    return (
        <>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">Simple Chat</span>
                    <span className="title">Login</span>
                    <form onSubmit={handleSubmit}>

                        <input type="email" name='email' placeholder="Email" />
                        <input type="password" name='password' placeholder="Password" />

                        <button>Login</button>
                        {error && <span style={{ color: 'red', fontWeight: 'bold' }}>Something went to wrong</span>}
                    </form>
                    <p>You do have an account? <Link to={'/register'}>Register</Link> </p>
                </div>
            </div>
        </>
    )
}

export default Login;