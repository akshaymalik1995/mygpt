
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import QueryInput from "./Query/QueryInput";
import Chat from "./Chat";
import Welcome from "./Welcome";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../app/types";
import UpdateGPT from "./UpdateGpt";
import { useState } from "react";
import { deleteGpt } from "../app/slices/gptsSlice";
import { BiMenu } from "react-icons/bi";
import Sidebar from "./Sidebar";

export default function Main() {
    const { id: activeGptId } = useSelector((state: State) => state.activeGpt)
    const { gpts } = useSelector((state: State) => state.gpts)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    let activeGPT = gpts[activeGptId]
    const [gptUpdateOpen, setGptUpdateOpen] = useState(false)
    const dispatch = useDispatch()
    function deleteGptHandler(id: string) {
        if (confirm("Are you sure you want to delete?")) {
            dispatch(deleteGpt({ id }))
        }
    }

    return (
        <>
            <Sidebar setOpen={setSidebarOpen} open={sidebarOpen} />
            <div className=" md:ml-64 h-full flex-1 ">
                <div className="flex p-4 max-w-4xl mx-auto gap-8 h-full justify-between flex-col">

                    <div className="header bg-white sticky top-0 py-4 flex gap-3 items-center">
                        <BiMenu onClick={() => setSidebarOpen(true)} className="text-4xl cursor-pointer md:hidden" />
                        {
                            activeGPT && (
                                <>
                                    <h2 className="text-xl md:text-4xl ">{activeGPT.name}</h2>
                                    <BiEdit className="cursor-pointer" onClick={() => setGptUpdateOpen(true)} />
                                    <AiFillDelete className="cursor-pointer" onClick={() => deleteGptHandler(activeGPT.id)} />
                                    <UpdateGPT openModal={gptUpdateOpen} setOpenModal={(value: boolean) => setGptUpdateOpen(value)} />
                                </>
                            )
                        }

                       

                    </div>


                    <div className="flex-grow flex">
                        {activeGPT ? (<Chat />) : (<Welcome />)}
                    </div>
                    <div className="flex bg-white sticky bottom-0 pb-8 justify-center ">
                        <QueryInput />
                    </div>
                </div>
            </div>
        </>

    )
}
