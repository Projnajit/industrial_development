let ss=sessionStorage.getItem('dataArray');
let data=JSON.parse(ss);
let table=document.getElementById("table1");
console.log(data);

///PUSHING DATA TO THE TABLE
for(let i=0;i<data.length;i++)
{
    let row=table.insertRow(i+1);
    for(let j=0;j<6;j++)
    {
        let cell=row.insertCell(j);
        if(j==4) cell.innerHTML=`<td><img id="img" src=${data[i][j]} alt=""></td>`
        else if(j==5) cell.innerHTML=`<td><a href="index.html" class="accept">Edit</a><input type='button' value="Reject" class="reject"/></td>`
        else cell.innerHTML=data[i][j];
    }
}
///



///SEARCHING AND SHOWING THE DATA
function searching()
{
    let filter=document.getElementById("khojo").value.toUpperCase();
    let tr=table.getElementsByTagName("tr");
    for(let i=0;i<tr.length;i++)
    {
        let tableCell=tr[i].getElementsByTagName("td")[0];
        if(tableCell)
        {
            let text=tableCell.textContent || tableCell.innerHTML;
            if(text.toUpperCase().indexOf(filter)>-1) tr[i].style.display="";
            else tr[i].style.display="none";
        }
        
    }
}
//




///REMOVING ROW 
function deleterow(evnt)
{
    if(!evnt.target.classList.contains("reject"))  return;
    let rowNumber=evnt.target.closest("tr").rowIndex;
    console.log(rowNumber);
    evnt.target.closest("tr").remove();
    data.splice(rowNumber-1,1);
    console.log(data);
    return;
}
table.addEventListener("click",deleterow);
///




///RESPOND TO CLICK TABLE DATA
function mainClick()
{
    //console.log(event.target.parentElement.rowIndex);
}
//




///PASSING DATA-ARRAY TO INDEX-PAGE
function transfer(ev)
{
    if(!ev.target.classList.contains("accept"))  return;

    let row=ev.target.closest("tr").rowIndex-1; //getting row id
    
    sessionStorage.setItem('array',JSON.stringify(data));
    sessionStorage.setItem('rowIdx',JSON.stringify(row));
    window.location.href="index.html";

    return;
}
table.addEventListener("click",transfer);
///



function backToHome(e)
{
    if(!e.target.classList.contains("home"))  return;
    sessionStorage.setItem('passing', JSON.stringify(data));
    window.location.href('index.html');
}

let back=document.getElementById("pera");
back.addEventListener("click",backToHome);