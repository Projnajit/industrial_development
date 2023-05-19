import { useState } from "react"
import Form from "./Form"

export default function App()
{
    const [show,setShow]=useState(true);

    return (
        <Form />
    )
}