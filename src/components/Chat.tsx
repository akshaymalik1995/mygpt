import { useSelector } from "react-redux"
import { State } from "../app/types"
import Markdown from "react-markdown"
import Welcome from "./Welcome"
import "./markdown.css"
export default function Chat() {
  const { id: activeGptId } = useSelector((state: State) => state.activeGpt)
  const { gpts } = useSelector((state: State) => state.gpts)
  const activeGpt = gpts[activeGptId]

  return (
    <div className="flex overflow-auto w-full flex-col gap-4">
      {activeGpt && activeGpt.chat.length === 0 ? (
        <Welcome />

      ) : activeGpt && activeGpt.chat.map(message => (
        <div className="border-2 rounded-md " key={message.id}>
          <div className="bg-gray-100 p-4 " >{message.query}</div>
          <div className="p-4">
            {message.loading ? (
              <p>Loading ... </p>
            ) : (
              <Markdown className="markdown-text" >
                {message.response}
              </Markdown>
            )}
          </div>
        </div>
      ))}
      
    </div>
  )
}
