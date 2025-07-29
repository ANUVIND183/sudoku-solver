console.log("working");
let currnum="";
window.onload=function(){
    currnum="";
    startt();
}
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("sudoku_form").addEventListener("submit",function(e){
        let board="";
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                let box=document.getElementById(i.toString()+j.toString());
                let value=box.textContent;
                board+=(value==="" ?"0":value);
            }
        }
        document.getElementById("board_data").value=board;
    });
});
function startt(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let box=document.getElementById(i.toString()+j.toString());
            box.onclick=function(){
                addNumber(this);
            }
            if(j==2 || j==5){
                box.style.borderRight="3px solid black";
            }
            if(i==2 || i==5){
                box.style.borderBottom="3px solid black";
            }
        }
    }
    let clr=document.getElementById("clear");
    clr.onclick=function(){
        clearr();
    }
    let rst=document.getElementById("restart");
    rst.onclick=function(){
        resett();
    }
    for(let i=1;i<10;i++){
        let box=document.getElementById(i.toString());
        box.onclick=function(){
            setnum(this);
        }
    }
}
function addNumber(box){
    box.textContent=currnum;
}
function setnum(box){
    if(currnum!=""){
        let curr=document.getElementById(currnum);
        curr.style.backgroundColor="white";
    }
    currnum=box.textContent;
    box.style.backgroundColor="grey";
}
function clearr(){
    if(currnum!=""){
        let curr=document.getElementById(currnum);
        curr.style.backgroundColor="white";
    }
    currnum="";
}
function resett(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let box=document.getElementById(i.toString()+j.toString());
            box.textContent="";
        }
    }
}