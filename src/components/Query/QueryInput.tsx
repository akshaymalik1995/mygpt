import { TextInput, Button } from "flowbite-react"
import { IoMdSend } from "react-icons/io"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateGpt } from "../../app/slices/gptsSlice"
import makeQuery from "./makeQuery"
import { State } from "../../app/types"
import { nanoid } from "@reduxjs/toolkit"
import { Model } from "../../app/types"
import { setActiveGpt } from "../../app/slices/activeGptSlice"
import { ChatMessage } from "../../app/types"

import { useEffect } from "react"


export default function QueryInput() {
    const [input, setInput] = useState("")
    const [response, setResponse] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { id: activeGptId } = useSelector((state: State) => state.activeGpt)
    const { key } = useSelector((state: State) => state.settings)

    const { gpts } = useSelector((state: State) => state.gpts)
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [formSubmitted, response])

    async function sendQuery(e: React.FormEvent) {
        e.preventDefault()

        if (!key) {
            alert("OPENAI KEY is required. Go to the settings to enter the key. ")
            return
        }

        // Create initial Chat Message
        let newChatMessage: ChatMessage = {
            id: nanoid(),
            query: input,
            response: "",
            loading: true
        }
        // Get the active gpt if there is any
        let gpt = gpts[activeGptId]
        // if there is gpt present
        if (gpt) {
            // If there is some gpt, simply add the chat Message to it
            gpt = { ...gpt, chat: [...gpt.chat, newChatMessage] }
        } else {
            // We create a new gpt
            gpt = {
                id: nanoid(),
                name: "New GPT",
                systemPrompt: "",
                created: new Date().toISOString(),
                modified: new Date().toISOString(),
                model: Model.gpt35turbo,
                chat: [newChatMessage]
            }
        }
        // We set the state that form is submitted.
        setFormSubmitted(true)
        // We dispatch to register the new message
        dispatch(updateGpt({ gpt }))
        // we are changing the active gpt in case we are creating a new gpt
        dispatch(setActiveGpt({ id: gpt.id }))
        // We make a query to the server

        try {
            const stream = await makeQuery(input, gpt, key)

            for await (const chunk of stream) {
                const data = chunk.choices[0]?.delta?.content || ""
                // When we get the data, we up[date the gpt
                setResponse((response) => response + data)
                gpt = {
                    ...gpt, chat: gpt.chat.map(message => {
                        if (message.id === newChatMessage.id) {
                            return { ...message, loading: false, response: message.response + data }
                        }
                        return message
                    })
                }
                // We update the gpt
                dispatch(updateGpt({ gpt }))
            }
        } catch (error) {
            console.log(error)
            alert(error)
            gpt = {
                ...gpt, chat: gpt.chat.map(message => {
                    if (message.id === newChatMessage.id) {
                        return { ...message, loading: false, response : "**Error** : Something went wrong." }
                    }
                    return message
                })
            }
            // We update the gpt
            dispatch(updateGpt({ gpt }))
        }

        setInput("")
        setResponse("")
        setFormSubmitted(false)
    }
    return (
        <div className="w-full">
            <form className="flex w-full max-w-4xl gap-4" onSubmit={sendQuery} action="">
                <TextInput value={input} onChange={(e) => setInput(e.target.value)} className="w-full" />
                <Button type="submit"  > <div className="flex items-center justify-center"><IoMdSend /></div> </Button>
            </form>

        </div>
    )
}
