import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";


import { auth } from "../firebase/Firebase.init";
import { AuthContex } from "./AuthContex";

export const ChatContex = createContext()

export const ChatContexProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContex)

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                };

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return (
        <ChatContex.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContex.Provider>
    )
}