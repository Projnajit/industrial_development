let data=[];
let x=document.forms["form1"];
let flag=false;



///CONCATENATION THE tempDATA-ARRAY WITH DATA-ARRAY
let ss=sessionStorage.getItem('array');
let ss2=sessionStorage.getItem('passing');
let index=sessionStorage.getItem('rowIdx');
let tempData=JSON.parse(ss); ///CATCHING BY EDIT BUTTON
let tempData2=JSON.parse(ss2); ///CATHING BY HOME BUTTON
let tempIndex=JSON.parse(index);

if(tempData!=null) data=tempData;
if(tempData2!=null) data=tempData2;


if(tempIndex!=null)
{
    for(let i=0;i<x.length-1;i++)
    {
        x.elements[i].value=data[tempIndex][i];
    }
}


///PUSHING INPUTS TO DATA-ARRAY
function submitCall()
{
    let object={},flag=true;
    for(let i=0;i<x.length;i++)
    {   
        object[i]=(x.elements[i].value);
        if(flag===true && object[i]==="")
        {
            alert("Fill all the given Input correctly!");
            flag=false;
        }
        if(i===2 && flag===true)
        {
            if(object[i]>7 || object[i]<1)
            {
                alert("Make leave-day range in between (1-7) days!");
                flag=false;
            }
        }
        x.elements[i].value="";
    }
    if(flag) 
    {
        alert("Your data submitted Successfully!");
        if(tempIndex!=null) 
        {
            console.log("cheeers!!!");
            data[tempIndex]=object;
            tempIndex=null;
        }
        else data.push(object);
        console.log(data);
    }
}




///PASSING DATA-ARRAY to NEWPAGE
document.getElementById("newpage").onclick=function()
{
    sessionStorage.setItem('dataArray',JSON.stringify(data));
    window.location.href="checkout_leave.html";
}
///



