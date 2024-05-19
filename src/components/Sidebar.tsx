import { useDispatch, useSelector } from "react-redux"
import { State } from "../app/types"
import { Button } from "flowbite-react"
import AddGPT from "./AddGPT"
import { useState } from "react"
import Settings from "./Settings"
import { setActiveGpt } from "../app/slices/activeGptSlice"
import { BiCollapse } from "react-icons/bi"


export default function Sidebar(props : {open : Boolean, setOpen: Function}) {
  const { gpts } = useSelector((state: State) => state.gpts)
  const dispatch = useDispatch()
  const [addGptOpen, setGptOpen] = useState(false)
  const [addSettingsOpen, setSettingsOpen] = useState(false)
  const keysSorted = Object.keys(gpts).sort((a, b) => new Date(gpts[b].created).getTime() - new Date(gpts[a].created).getTime())
  console.log(gpts)

  function gptClickHandler(gptId : string){
    dispatch(setActiveGpt({ id: gptId }))
    props.setOpen(false)
  }

  return (
    <div className={`h-screen  ${props.open ? '-translate-x-0 z-10' : '-translate-x-full'} md:-translate-x-0 fixed top-0 bottom-0  w-64 bg-gray-100 `}>

      <div className="flex h-full flex-col">
        <div className="p-2 rounded-none items-center flex justify-between w-full bg-gray-800 text-white cursor-pointer  border"><div className="grow" onClick={() => setGptOpen(true)}>New Chat</div><div className="md:hidden" onClick={() => props.setOpen(false)} ><BiCollapse /></div></div>
        <AddGPT openModal={addGptOpen} setOpenModal={setGptOpen} />
        <div className="grow overflow-auto">
          {keysSorted.map(gptId => (
            <div onClick={() => gptClickHandler(gptId)} key={gptId} className="p-2 cursor-pointer rounded bg-gray-200 border hover:bg-gray-300 ">{gpts[gptId].name}</div>
          ))}
        </div>

        <Button onClick={() => setSettingsOpen(true)} className="flex justify-center w-full bg-gray-800 rounded-none cursor-pointer" >Settings</Button>
        <Settings openModal={addSettingsOpen} setOpenModal={setSettingsOpen} />
      </div>
    </div>
  )
}
