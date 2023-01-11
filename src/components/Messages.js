import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ChatContex } from '../context/ChatContex.js';
import { db } from '../firebase/Firebase.init.js';
import Message from './Message.js'

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContex)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])
    return (
        <>
            <div className="messages">
                {messages.map((m) => (

                    <Message message={m} key={m} />
                ))}

            </div>
        </>
    )
}

export default Messages;