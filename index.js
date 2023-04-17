let storage=JSON.parse(localStorage.getItem('pushing')) || [];
let index=JSON.parse(localStorage.getItem('rIndex')) || null;
const form=document.getElementById("form1");
const submitButtonCatch=document.getElementById("submitButton");
let imageLink;



//FIXING CALENDAR
let date=new Date();
let year=date.getFullYear();
let month=date.getMonth()+1;
let todayDate=date.getDate();
if(month<10) month='0'+month;
if(todayDate<10) todayDate='0'+todayDate;
let datePattern=year + '-' + month + '-' + todayDate;
const dateVal=document.getElementById("startDay");
dateVal.setAttribute('min',datePattern);






//FORM VALIDATION CHECK
let nameField=startDayField=daysField=selectField=photoField=false;
function validationCheck()
{
    if(nameField && startDayField && daysField && selectField && photoField) submitButtonCatch.disabled=false;
    else submitButtonCatch.disabled=true;
}
//validate NAME
const fullName=document.getElementById("fullName"); 
fullName.addEventListener('keyup',(event)=>{
    let str=event.target.value;
    let temp=(/\w/g).test(str)
    if(event.target.value=='' || !temp)
    {
        nameField=false;
        event.target.parentElement.className='formControl error';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='*Fill up your name.';
    }
    else
    {
        nameField=true;
        event.target.parentElement.className='formControl success';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='Success!'; 
        validationCheck() 
    }
})
//validate STARTDAY
const startDay=document.getElementById("startDay");
startDay.addEventListener('change',(event)=>{
    if(event.target.value=='')
    {
        startDayField=false;
        event.target.parentElement.className='formControl error';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='*Fill up your Start-Day.';
    }
    else
    {
        startDayField=true;
        event.target.parentElement.className='formControl success';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='Success!';  
        validationCheck()
    }
})
//validate DAYS
const days=document.getElementById("days");
days.addEventListener('input',(event)=>{
    if(event.target.value=='')
    {
        daysField=false;
        event.target.parentElement.className='formControl error';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='*Fill up the amount of leave-days.';
    }
    else if(event.target.value>7 || event.target.value<1)
    {
        daysField=false;
        event.target.parentElement.className='formControl error';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='*Make your leave-days between 1-7.';
    }
    else
    {
        daysField=true;
        event.target.parentElement.className='formControl success';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='Success!';  
        validationCheck()
    }
})
//validate SELECT
const select=document.getElementById("select");
select.addEventListener('change',(event)=>{
    if(event.target.value=='')
    {
        selectField=false;
        event.target.parentElement.className='formControl error';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='*Select the reason of leave.';
    }
    else
    {
        selectField=true;
        event.target.parentElement.className='formControl success';
        let text=event.target.parentElement.querySelector('small');
        text.innerHTML='Success!';  
        validationCheck()
    }
})
//validate PHOTO
const photo = document.getElementById("photo");
photo.addEventListener('change', (event) => {

    let reader = new FileReader();
    reader.addEventListener('load', () => {
        imageLink=reader.result;
        validationCheck(); // validationCheck function that relies on the image URL being stored
    });
    reader.readAsDataURL(event.target.files[0]);

    if (event.target.value == '') {
        event.target.parentElement.className = 'formControl error';
        let text = event.target.parentElement.querySelector('small');
        text.innerHTML = '*Add a picture.';
    }
    else {
        event.target.parentElement.className = 'formControl success';
        let text = event.target.parentElement.querySelector('small');
        text.innerHTML = 'Success!';  
    }
})

//CHECK IF THERE ANY CHANGE TO FORM
form.addEventListener('input',()=>{
    if(fullName.value!='' && startDay.value!='' && days.value!='' && select.value!='' && photo.value!='' && days.value>=1 && days.value<=7 && (/\w/g).test(fullName.value)) 
        nameField=startDayField=daysField=selectField=photoField=true;
    else 
    nameField=startDayField=daysField=selectField=photoField=false;
    validationCheck();
})








//PRESSING SUBMIT BUTTON
submitButtonCatch.addEventListener("click",(event) =>{
    let object={};
    object["id"]=Date.now;
    for(let i=0;i<form.length;i++) 
    {
        if(i==4) object[form.elements[i].name]=imageLink;
        else object[form.elements[i].name]=form.elements[i].value.trim();
    }
    
    alert("Your data submitted Successfully!!");
    if(index!=null) 
    {
        storage[index]=object;
        index=null;
    }
    else storage.push(object);
    localStorage.setItem('pushing',JSON.stringify(storage));
    localStorage.setItem('rIndex',JSON.stringify(index));
    console.log(storage);
    cleanTheForm();
});






//EDIT OPTION IS ACTIVE
if(index!=null) 
{
    index--;
    let form=document.getElementById("form1"),i=0;
    for(let key in storage[index]) form.elements[i++].value=storage[index][key];
}





//RESET BUTTON PRESSED
const reset=document.getElementById("resetButton");
reset.addEventListener("click",()=>{
    cleanTheForm();
});





//CLEANING THE FROM
function cleanTheForm() {
    form.reset();
    fullName.parentElement.className='formControl';
    startDay.parentElement.className='formControl';
    days.parentElement.className='formControl';
    select.parentElement.className='formControl';
    photo.parentElement.className='formControl';
}