import { useEffect, useState } from "react"
import Form from "./Form"
import Table from "./Table"

export default function App()
{
    const [choice,setChoice]=useState({value:true});
    
    const handleChoice = () => {
        setChoice((prevChoice)=>({
            value:!prevChoice.value
        }));
    }
    
    return (
        <>
            <div>{choice.value ? <Form  handleChoice={handleChoice} /> : <Table handleChoice={handleChoice} /> }</div>
        </>
    )
}

