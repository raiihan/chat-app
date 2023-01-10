import { useContext, useState } from "react";
import { collection, getDocs, query, setDoc, doc, where, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/Firebase.init'
import { AuthContex } from "../context/AuthContex";

const Search = () => {
    const { currentUser } = useContext(AuthContex)
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", username));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                if (doc) {
                    setUser(doc.data())
                    setErr(false)
                }
                else {
                    setErr(true)
                }
            });
        } catch (error) {
            setErr(true)
        }

    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
        // check whether the group(chat in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDocs(doc(db, "chats", combinedId))

            if (!res.exist()) {
                // create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { message: [] })

                // create user chats
                await updateDoc(doc, (db, "chats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
                // other user
                await updateDoc(doc, (db, "chats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }

        } catch (error) {

        }

        setUser(null)
        setUsername("")
        // create user chats
    }
    return (
        <>
            <div className="search">
                <div className="searchForm">
                    <input type="text" onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="find a user" />

                </div>
                {err && <span style={{ color: 'white' }}>User Not Found</span>}
                {user && <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Search;