let board=[]
let currNumber="";
window.onload=function(){
    startGame();
}
function startGame(){
    for(let i=0;i<9;i++){
        row=[];
        for(let j=0;j<9;j++){
            let box=document.createElement("div");
            box.id=i.toString()+j.toString();
            box.className="cell";
            if(j==2 || j==5){
                box.style.borderRight="3px solid black";
            }
            if(i==2 || i==5){
                box.style.borderBottom="3px solid black";
            }
            box.onclick=function(){
                addNumber(this);
            }
            document.getElementById("board").append(box);
            row.push(box);
        }
        board.push(row);
    }
    for(let i=0;i<9;i++){
        let box=document.createElement("div");
        box.textContent=(1+i).toString();
        box.id=(1+i).toString();
        box.className="number";
        box.onclick=function(){
            setCurrNumber(this);
        }
        document.getElementById("num").append(box);
    }
    document.getElementById("restart").onclick=function(){
        reset();
    }
    document.getElementById("clear").onclick=function(){
        clear();
    }
    document.getElementById("switch").onclick=function(){
        swap(board);
    }
    document.getElementById("switch_prob").onclick=function(){
        switch_prob();
    }
}
function setCurrNumber(box){
    if(currNumber!=""){
        let curr=document.getElementById(currNumber);
        curr.style.backgroundColor="white";
    }
    currNumber=box.textContent;
    box.style.backgroundColor="grey";
}

function addNumber(box){
    box.textContent=currNumber;
}
function clear(){
    if(currNumber!=null){
        let curr=document.getElementById(currNumber);
        curr.style.backgroundColor="white";
    }
    currNumber="";
}
function reset(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            box=document.getElementById(i.toString()+j.toString());
            box.textContent="";
        }
    }
    if(currNumber!=""){
        document.getElementById(currNumber).style.backgroundColor="white";
    }
}
function swap(){
    if(currNumber==""){
        return
    }
    let num=parseInt(currNumber);
    for(let i=0;i<num;i++){
        a=Math.floor(Math.random()*9)+1
        b=Math.floor(Math.random()*9)+1
        swap_numbers(a,b);
    }
    return;
}
function swap_numbers(a,b){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            box=document.getElementById(i.toString()+j.toString());
            if(box.textContent==a){
                box.textContent=b;
            }
            else if(box.textContent==b){
                box.textContent=a;
            }
        }
    }
}
function swap_raws(){
    let n=Math.floor(Math.random()*3);
    let a=Math.floor(Math.random()*3);
    let b=Math.floor(Math.random()*3);
    a=n*3+a;
    b=n*3+b;
    for(let i=0;i<9;i++){
        t=document.getElementById(a.toString()+i.toString()).textContent;
        document.getElementById(a.toString()+i.toString()).textContent=document.getElementById(b.toString()+i.toString()).textContent;
        document.getElementById(b.toString()+i.toString()).textContent=t;
    }
}
function swap_columns(){
    let n=Math.floor(Math.random()*3);
    let a=Math.floor(Math.random()*3);
    let b=Math.floor(Math.random()*3);
    a=n*3+a;
    b=n*3+b;
    for(let i=0;i<9;i++){
        t=document.getElementById(i.toString()+a.toString()).textContent;
        document.getElementById(i.toString()+a.toString()).textContent=document.getElementById(i.toString()+b.toString()).textContent;
        document.getElementById(i.toString()+b.toString()).textContent=t;
    }
}
function switch_prob(){
    swap();
    let n=2;
    for(let i=0;i<n;i++){
        swap_columns();
        swap_raws();
    }
}