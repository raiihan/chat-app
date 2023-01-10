import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "../firebase/Firebase.init";
import Add from '../img/addAvatar.png'
const Register = () => {
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const file = e.target.file.files[0];


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setError(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL

                        })
                        await setDoc(doc(db, "user", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });
                    });
                }
            );


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
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" />
                        <input type="email" name='email' placeholder="Email" />
                        <input type="password" name='password' placeholder="Password" />
                        <input style={{ display: 'none' }} name="file" type="file" id="file" />
                        <label htmlFor="file">
                            <img src={Add} alt="" />
                            Add An Avatar
                        </label>
                        <button>Sign up</button>
                        {error && <span style={{ color: 'red', fontWeight: 'bold' }}>Something went to wrong</span>}
                    </form>
                    <p>You do have an account? Login</p>
                </div>
            </div>
        </>
    )
}

export default Register;