import React, { useState } from "react";
import './Form.css'

export default function Form()
{
    const [fullName, setFullName] = useState('');
    const [startDay, setStartDay] = useState('');
    const [days, setDays] = useState('');
    const [type, setType] = useState('');
    const [photo, setPhoto] = useState('');
  
    const handleFullNameChange = (event) => {
      setFullName(event.target.value);
    };
  
    const handleStartDayChange = (event) => {
      setStartDay(event.target.value);
    };
  
    const handleDaysChange = (event) => {
      setDays(event.target.value);
    };
  
    const handleTypeChange = (event) => {
      setType(event.target.value);
    };
  
    const handlePhotoChange = (event) => {
      setPhoto(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform form submission logic here
    };

    const handleReset = () => {
      setFullName('');
      setStartDay('');
      setDays('');
      setType('');
      setPhoto('');
    };


    return(
        <div className="page">
            <header id="header">Submit Leave</header><br />
            <form id="form1" autoComplete="off" onSubmit={handleSubmit}>
            <div className="formControl">
                <label htmlFor="name">Name:</label>
                <input type="text" className="inp" id="fullName" name="name" value={fullName} onChange={handleFullNameChange} required />
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i><br />
                <small>Error message</small>
            </div>
            <br />
            <div className="formControl">
                <label htmlFor="sd">Start date:</label>
                <input type="date" className="inp" id="startDay" name="startDay" value={startDay} onChange={handleStartDayChange} required />
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i><br />
                <small>Error message</small>
            </div>
            <br />
            <div className="formControl">
                <label htmlFor="days"># of days:</label>
                <input type="number" id="days" className="inp" name="days" min="1" max="7" value={days} onChange={handleDaysChange} required />
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i><br />
                <small>Error message</small>
            </div>
            <br />
            <div className="formControl">
                <label htmlFor="type">Type:</label>
                <select name="type" className="inp" id="select" value={type} onChange={handleTypeChange}>
                <option value=""></option>
                <option value="Sick">Sick</option>
                <option value="General">General</option>
                <option value="Accident">Accident</option>
                <option value="Function">Function</option>
                </select>
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i><br />
                <small>Error message</small>
            </div>
            <br />
            <div className="formControl">
                <label htmlFor="photos">Photos:</label>
                <input type="file" className="inp" name="photo" id="photo" value={photo} onChange={handlePhotoChange} />
                <i className="fa-sharp fa-solid fa-circle-check"></i>
                <i className="fa-solid fa-circle-exclamation"></i><br />
                <small>Error message</small>
            </div>
            <br />
            <div id="bt">
                <button disabled={!fullName || !startDay || !days || !type} id="submitButton" type="submit">Submit</button>
                <button id="resetButton" type="button" onClick={handleReset}>Cancel</button><br /><br /><br />
            </div>
            </form>
            <a href="checkoutLeave.html" id="newpage">Checkout Leaves</a>
        </div>
    );
}



// import React, { useState } from "react";
// import './Form.css'

// export default function Form() {
//   const [fullName, setFullName] = useState('');
//   const [startDay, setStartDay] = useState('');
//   const [days, setDays] = useState('');
//   const [type, setType] = useState('');
//   const [photo, setPhoto] = useState('');

//   const handleFullNameChange = (event) => {
//     setFullName(event.target.value);
//   };

//   const handleStartDayChange = (event) => {
//     setStartDay(event.target.value);
//   };

//   const handleDaysChange = (event) => {
//     setDays(event.target.value);
//   };

//   const handleTypeChange = (event) => {
//     setType(event.target.value);
//   };

//   const handlePhotoChange = (event) => {
//     setPhoto(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform form submission logic here
//   };

//   const handleReset = () => {
//     setFullName('');
//     setStartDay('');
//     setDays('');
//     setType('');
//     setPhoto('');
//   };


//   return (
//     <div className="page">
//       <header id="header">Submit Leave</header>
//       <br />
//       <form id="form1" autoComplete="off" onSubmit={handleSubmit}>
//         {/* Form content */}
//       </form>
//       <button disabled={!fullName || !startDay || !days || !type} id="submitButton" type="submit">
//         Submit
//       </button>
//       <button id="resetButton" type="button" onClick={handleReset}>
//         Cancel
//       </button>
//       <br />
//       <br />
//       <br />
//       <a href="checkoutLeave.html" id="newpage">Checkout Leaves</a>
//     </div>
//   );
// }
