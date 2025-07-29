let board=[]
let currNumber="";
let problem,solution;
document.addEventListener("DOMContentLoaded",function(){
    problem=JSON.parse(document.getElementById("problem").textContent);
    solution=JSON.parse(document.getElementById("solution").textContent);
    console.log("problem grid:"+problem);
    console.log("solution grid:"+solution);
})
// const prob=JSON.parse(document.getElementById("problem").textContent);
console.log(solution);
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
            if(problem[i][j]!=0){
                box.textContent=problem[i][j]
                box.classList.add("given");
            }
            box.onclick=function(){
                addNumber(this,i,j);
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
    document.getElementById("solve").onclick=function(){
        solve2(board);
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

function addNumber(box,i,j){
    if(box.classList.contains('given')){
        return
    }
    box.textContent=currNumber;
    if(currNumber==""){
        box.style.color="black";
        return;
    }
    if(currNumber!=solution[i][j]){
        box.style.color="red";
    }
    else{
        box.style.color="black"
    }
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
            if(problem[i][j]!=0){
                box.textContent=problem[i][j];
            }
            else{
            box.textContent="";
            }
        }
    }
    if(currNumber!=""){
        document.getElementById(currNumber).style.backgroundColor="white";
    }
}
function checkValid(board,row,col,n){
    for(let i=0;i<9;i++){
        if(parseInt(board[row][i].textContent)==n)
            return false;
    }
    for(let i=0;i<9;i++){
        if(parseInt(board[i][col].textContent)==n)
            return false;
    }
    let r=Math.floor(row/3)*3;
    let c=Math.floor(col/3)*3;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(parseInt(board[r+i][c+j].textContent)==n){
                return false;
            }
        }
    }
    return true;
}
function solve(board,row,col){
    if(row==9){
        return true;
    }
    let nrow;
    let ncol;
    if(col==8){
        nrow=row+1;
        ncol=0;
    }
    else{
        ncol=col+1
        nrow=row;
    }
    if(board[row][col].textContent!=""){
        return solve(board,nrow,ncol);
    }
    else{
        for(let i=1;i<=9;i++){
            if(checkValid(board,row,col,i)){
                board[row][col].textContent=""+i;
                if(solve(board,nrow,ncol)){
                    return true;
                }
                else{
                    board[row][col].textContent="";
                }
            }
        }
        return false;
    }
}
function solve2(board){
    if(solve(board,0,0)==false){
        alert("no solution");
    }
}