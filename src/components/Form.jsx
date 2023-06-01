import React, { useEffect, useState } from "react";
import '../css/Form.css'
import { Link } from "react-router-dom";

export default function Form({ handleChoice }) {
  const [fullName, setFullName] = useState('');
  const [startDay, setStartDay] = useState('');
  const [days, setDays] = useState('');
  const [type, setType] = useState('');
  const [photo, setPhoto] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [person, setPerson] = useState({});
  const [fieldClassNames, setFieldClassNames] = useState({
    fullName: '',
    startDay: '',
    days: '',
    type: '',
    photo: ''
  });


  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let todayDate = date.getDate();
  if (month < 10) month = "0" + month;
  if (todayDate < 10) todayDate = "0" + todayDate;
  let datePattern = year + "-" + month + "-" + todayDate;

  let storage = JSON.parse(localStorage.getItem("storage")) || [];
  let index = JSON.parse(localStorage.getItem("index")) || null;

  useEffect(() => {
    if (index !== null && index >= 0) {
      const ind = index - 1;
      setFullName(storage[ind].name);
      setStartDay(storage[ind].startDay);
      setDays(storage[ind].days);
      setType(storage[ind].type);
    }
  }, [index]);

  useEffect(() => {
    const updatePerson = { ...person, ['name']: fullName, ['startDay']: startDay, ['days']: days, ['type']: type, ['photo']: imageBase64 };
    setPerson(updatePerson);
  }, [fullName, startDay, days, type, imageBase64]);

  const success = (field) => {
    setFieldClassNames(prevClassNames => ({ ...prevClassNames, [field]: 'formControl success' }));
  }

  const error = (field, event,  message) => {
    setFieldClassNames(prevClassNames => ({ ...prevClassNames, [field]: 'formControl error' }));
    event.target.parentElement.lastChild.textContent=message;
    
  }

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    const alphaNumeric = /\w/g.test(event.target.value);
    const message = "*Enter your full name.";
    (event.target.value !== '' && alphaNumeric) ? success('fullName') : error('fullName', event, message);
  };

  const handleStartDayChange = (event) => {
    setStartDay(event.target.value);

    const message = "*Fill up your Start-Day.";
    (event.target.value !== '') ? success('startDay') : error('startDay', event,  message);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);

    if (event.target.value === "") {
      const message = "*Fill up the amount of leave-days.";
      error('days', event,  message);
    } else if (event.target.value > 7 || event.target.value < 1) {
      const message = "*Make your leave-days between 1-7.";
      error('days', event,  message);
    } else {
      success('days');
    }
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);

    const message = "*Make your leave-days between 1-7.";
    (event.target.value !== '') ? success('type') : error('type', event,  message);
  };

  const handlePhotoChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setImageBase64(base64Image);
    };
    setPhoto(event.target.value);

    reader.readAsDataURL(event.target.files[0]);
    const message = "*Insert a Photo.";
    (event.target.value !== '') ? success('photo') : error('photo', event,  message);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Your data submitted Successfully.")
    if (index !== null) storage[--index] = person;
    else storage.push(person);
    localStorage.setItem('storage', JSON.stringify(storage));
    localStorage.setItem('index', JSON.stringify(null));
    console.log(storage);
    handleReset();
  };

  const handleReset = () => {
    setFullName('');
    setStartDay('');
    setDays('');
    setType('');
    setPhoto('');
    setFieldClassNames({
      fullName: '',
      startDay: '',
      days: '',
      type: '',
      photo: ''
    });
  };

  return (
    <div className="page">
      <header id="header">Submit Leave</header><br />
      <form id="form1" autoComplete="off" onSubmit={handleSubmit}>
        <div className={fieldClassNames.fullName}>
          <label htmlFor="name">Name:</label>
          <input type="text" className="inp" id="fullName" name="name" value={fullName} onChange={handleFullNameChange} required />
          <i className="fa-sharp fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-exclamation"></i><br />
          <small>Error message</small>
        </div>
        <br />
        <div className={fieldClassNames.startDay}>
          <label htmlFor="sd">Start date:</label>
          <input type="date" className="inp" id="startDay" name="startDay" value={startDay} min={datePattern} onChange={handleStartDayChange} required />
          <i className="fa-sharp fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-exclamation"></i><br />
          <small>Error message</small>
        </div>
        <br />
        <div className={fieldClassNames.days}>
          <label htmlFor="days"># of days:</label>
          <input type="number" id="days" className="inp" name="days" min="1" max="7" value={days} onChange={handleDaysChange} required />
          <i className="fa-sharp fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-exclamation"></i><br />
          <small>Error message</small>
        </div>
        <br />
        <div className={fieldClassNames.type}>
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
        <div className={fieldClassNames.photo}>
          <label htmlFor="photos">Photos:</label>
          <input type="file" className="inp" name="photo" id="photo" value={photo} onChange={handlePhotoChange} />
          <i className="fa-sharp fa-solid fa-circle-check"></i>
          <i className="fa-solid fa-circle-exclamation"></i><br />
          <small>Error message</small>
        </div>
        <br />
        <div id="bt">
          <button disabled={!fullName || !startDay || !days || !type || !photo} id="submitButton" type="submit">Submit</button>
          <button id="resetButton" type="button" onClick={handleReset}>Cancel</button><br /><br /><br />
        </div>
      </form>
      <Link id='newpage' to='/checkLeave'>Checkout Leaves</Link>
    </div>
  );
}
