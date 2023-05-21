import React, { useState } from 'react';
import '../css/Table.css'

export default function Table({handleChoice}) {

    let storage = JSON.parse(localStorage.getItem('storage')) || [];

    const [filter,setFilter]=useState('');

    const handleSearch = (event) => {
        setFilter(event.target.value.toUpperCase());
    };

    const filterStorage=storage.filter((item)=> item.name.toUpperCase().includes(filter));


    const handleEdit = (index) => {
        localStorage.setItem('index',JSON.stringify(index+1));
        handleChoice();
    };

    const handleReject = (event,index) => {
        const signal=confirm("Are you sure?");
        if(signal)
        {
            storage.splice(index,1);
            event.target.parentElement.parentElement.remove();
            localStorage.setItem('storage',JSON.stringify(storage));
        }
    };

    const handleSubmitLeave = () => {
        localStorage.setItem('index',JSON.stringify(''));
        handleChoice();
    }

    const handleHome = () => {
        localStorage.setItem('index',JSON.stringify(''));
        handleChoice();
    }


    return (
        <div>
            <input type="text" id="khojo" onKeyUp={handleSearch} placeholder="Enter Name to Search" />
            <a href="#" className="home" onClick={handleHome}>Home</a>
            <br /><br />
            <table id="table1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start date</th>
                        <th># of days</th>
                        <th>Type</th>
                        <th>Photo</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                {filterStorage.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.startDay}</td>
                        <td>{item.days}</td>
                        <td>{item.type}</td>
                        <td><img id="img" src={item.photo} alt="" /></td>
                        <td><a href="#" id="edit" onClick={() => handleEdit(index)}>Edit</a><input type='button' value='Reject' id="reject" onClick={(event) => handleReject(event,index)}/></td>
                    </tr>
                ))}
                </tbody>

            </table>
            <br /><br /><br /><br />
            <a href="#" id="button1" onClick={handleSubmitLeave}>Submit a Leave Request</a>
        </div>
    );
}
