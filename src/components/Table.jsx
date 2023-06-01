import React, { useState } from 'react';
import '../css/Table.css'
import { Link } from 'react-router-dom';

export default function Table({handleChoice}) {

    let storage = JSON.parse(localStorage.getItem('storage')) || [];

    const [filter,setFilter]=useState('');

    const handleSearch = (event) => {
        setFilter(event.target.value.toUpperCase());
    };

    const filterStorage=storage.filter((item)=> item.name.toUpperCase().includes(filter));


    const handleEdit = (index) => {
        localStorage.setItem('index',JSON.stringify(index+1));
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
            <Link className="home" to='/'>Home</Link>
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
                        <td>
                            <Link id="edit" to="/" onClick={() => handleEdit(index)}>Edit</Link>
                            <Link id="reject" onClick={(event) => handleReject(event,index)}>Reject</Link>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            <br /><br /><br /><br />
            <Link id="button1" to='/'>Submit a Leave Request</Link>
        </div>
    );
}
