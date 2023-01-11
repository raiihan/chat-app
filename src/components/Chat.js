import Cam from '../img/cam.png'
import add from '../img/add.png'
import more from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContex } from '../context/ChatContex'

const Chat = () => {

    const { data } = useContext(ChatContex)
    return (
        <>
            <div className="chat">
                <div className="chatInfo">
                    <span>{data.user?.displayName}</span>
                    <div className="chatIcons">
                        <img src={Cam} alt="" />
                        <img src={add} alt="" />
                        <img src={more} alt="" />
                    </div>
                </div>
                <Messages />
                <Input />
            </div>
        </>
    )
}

export default Chat;