
import { Button, Modal, TextInput, Label, Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { updateSettings } from "../app/slices/settingsSlice";
import { State } from "../app/types";


export default function Settings(props: { openModal: boolean, setOpenModal: (value: boolean) => any }) {
    const dispatch = useDispatch()
    const { setOpenModal, openModal } = props
    const settings = useSelector((state : State) => state.settings)
    const [form, setForm] = useState({
        key: "",
        mode : ""
})

    useEffect(() => {
        setForm(settings)
    }, [])

    
    function onsubmit(e: React.FormEvent) {
        e.preventDefault()
        // Validation
        // if (!form.key){
        //     alert("key field is required.")
        //     return
        // }
        
        dispatch(updateSettings({newSettings : form}))
        setOpenModal(false)
    }

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Settings</Modal.Header>
                <Modal.Body>
                    <form onSubmit={e => onsubmit(e)} className="space-y-2" action="">
                        <div className="space-y-2">
                            <Label htmlFor="key" >Key</Label>
                            <TextInput type="password" onChange={(e) => setForm({ ...form, key: e.target.value })} value={form.key} name="key" id="key" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="key" >Key</Label>
                            <Select onChange={(e) => setForm({ ...form, mode: e.target.value })} value={form.mode} name="mode" id="mode">
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </Select>
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
