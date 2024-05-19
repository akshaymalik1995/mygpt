import { FaReact } from "react-icons/fa";
export default function Welcome() {
  return (
    <div className="flex w-full h-full items-center justify-center">
        <div className="flex items-center gap-4">
            <FaReact className="text-2xl" />
            <h1 className="text-2xl font-bold">How can I help you today?</h1>
        </div>
       
    </div>
  )
}
