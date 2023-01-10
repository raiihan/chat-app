import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContex } from "../context/AuthContex";
import { auth } from "../firebase/Firebase.init";

const Navbar = () => {
    const { currentUser } = useContext(AuthContex)
    return (
        <>
            <div className="navbar">
                <span className="logo">Simple Chat</span>
                <div className="user">
                    <img src={currentUser.photoURL} alt="" />
                    <span>{currentUser.displayName}</span>
                    <button onClick={() => signOut(auth)}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar;