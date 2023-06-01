import { useEffect, useState } from "react"
import Form from "./Form"
import Table from "./Table"
import { Route, Routes } from "react-router-dom"

export default function App()
{
    // const [choice,setChoice]=useState({value:true});
    
    // const handleChoice = () => {
    //     setChoice((prevChoice)=>({
    //         value:!prevChoice.value
    //     }));
    // }
    
    return (
        <>
            <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/checkLeave' element={<Table />} />
            </Routes>
            {/* <div>{choice.value ? <Form  handleChoice={handleChoice} /> : <Table handleChoice={handleChoice} /> }</div> */}
        </>
    )
}

