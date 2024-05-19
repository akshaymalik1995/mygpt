
import { Button, Modal, TextInput, Label, Textarea, Select } from "flowbite-react";
import { State } from "../app/types";
import { Model } from "../app/types";
import { useSelector } from "react-redux";
import { GPT } from "../app/types";
import { updateGpt } from "../app/slices/gptsSlice";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";


export default function UpdateGPT(props: { openModal: boolean, setOpenModal: (value: boolean) => any }) {
  const {id : activeGptId} = useSelector((state : State) => state.activeGpt )
  const dispatch = useDispatch()
const {gpts} = useSelector((state : State) => state.gpts )
const {name, systemPrompt, max_tokens, model} = gpts[activeGptId]
  const { setOpenModal, openModal } = props
  const [form , setForm] = useState({
    name : "",
    systemPrompt : "",
    max_tokens : 0,
    model : ""
  })

  useEffect(() => {
    setForm({
      name,
      systemPrompt,
      max_tokens : max_tokens ? max_tokens : 0,
      model
    })
  }, [activeGptId])
 
  function onsubmit(e : React.FormEvent){
    e.preventDefault()
    const updatedGpt : GPT = {...gpts[activeGptId], ...form}
    dispatch(updateGpt({gpt : updatedGpt}))
    setOpenModal(false)
  }

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Settings</Modal.Header>
        <Modal.Body>
          <form onSubmit={e => onsubmit(e)} className="space-y-2" action="">
            <div className="space-y-2">
              <Label htmlFor="name" >Name</Label>
              <TextInput onChange={(e) => setForm({...form, name : e.target.value})} value={form.name} name="name" id="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="system-prompt" >System Prompt</Label>
              <Textarea onChange={(e) => setForm({...form, systemPrompt : e.target.value})} value={form.systemPrompt} name="system-prompt" id="system-prompt" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model" >Model</Label>
              <Select value={form.model} onChange={(e) => setForm({...form, model : e.target.value})} name="model" id="model">
                <option  value={Model.gpt35turbo}>{Model.gpt35turbo} </option>
                <option  value={Model.gpt4}>{Model.gpt4} </option>
                <option  value={Model.gpt4o}>{Model.gpt4o} </option>
                
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-tokens" >Max Tokens</Label>
              <TextInput onChange={(e) => setForm({...form, max_tokens : +e.target.value})} value={form.max_tokens > 0 ? form.max_tokens : ""} type="number" name="max-tokens" id="max-tokens" />
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
