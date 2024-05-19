
import { Button, Modal, TextInput, Label } from "flowbite-react";
import { GPT, Model } from "../app/types";
import { nanoid } from "@reduxjs/toolkit";
import { addGpt } from "../app/slices/gptsSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { setActiveGpt } from "../app/slices/activeGptSlice";


export default function AddGPT(props: { openModal: boolean, setOpenModal: (value: boolean) => any }) {
    const dispatch = useDispatch()
    const { setOpenModal, openModal } = props
    const [form, setForm] = useState({
        name: "",
})

    
    function onsubmit(e: React.FormEvent) {
        e.preventDefault()
        // Validation
        if (!form.name){
            alert("name field is required.")
            return
        }
        const newGpt : GPT = {
            id : nanoid(),
            systemPrompt : "",
            max_tokens : 1000,
            model : Model.gpt35turbo,
            chat : [],
            created : new Date().toISOString(),
            modified : new Date().toISOString(),
            ...form
        }
        dispatch(addGpt({gpt : newGpt}))
        dispatch(setActiveGpt({id : newGpt.id}))
        setOpenModal(false)
        setForm({name : ""})
    }

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Add Gpt</Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => onsubmit(e)} className="space-y-2" action="">
                        <div className="space-y-2">
                            <Label htmlFor="name" >Name</Label>
                            <TextInput onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} name="name" id="name" />
                        </div>
                       
                        <div className="flex py-2 space-x-2">
                            <Button type="submit">Submit</Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Decline
                            </Button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
}
