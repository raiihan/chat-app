import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/Firebase.init";
import { AuthContex } from "../context/AuthContex";
import { ChatContex } from "../context/ChatContex";


const Chats = () => {
    const [chats, setChats] = useState([])

    const { currentUser } = useContext(AuthContex)
    const { dispatch } = useContext(ChatContex)


    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()

    }, [currentUser.uid])

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    return (
        <>
            <div className="chats">
                {Object.entries(chats)?.map((chat) => (

                    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                        <img src={chat[1].userInfo.photoURL} alt="" />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <p>{chat[1].userInfo.lastMessage?.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Chats;