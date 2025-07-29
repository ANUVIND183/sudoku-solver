from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from sudokusolver import models
from django.contrib.auth import authenticate,login,logout
from .models import Sudoku
import json

def signup(request):
    if request.method=='POST':
        fnm=request.POST.get('fnm')
        emailid=request.POST.get('email')
        pwd=request.POST.get('pwd')
        my_user=User.objects.create_user(fnm,emailid,pwd)
        my_user.save()
        return redirect("/loginn")
    return render(request,'signup.html')
def loginn(request):
    if request.method=='POST':
        fnm=request.POST.get("fnm")
        pwd=request.POST.get("pwd")
        userr=authenticate(request,username=fnm,password=pwd)
        if userr is not None:
            login(request,userr)
            return redirect("/sdk")
        else:
            return redirect("/loginn")
    return render(request,"loginn.html")
def sdk(request):
    return render(request,'sdk.html')
def sudoku(request,prob_id):
    problems=Sudoku.objects.get(id=prob_id)
    return render(request,"sudoku.html",{"problem":problems.get_problem(),
                                         "solution":problems.get_solution()})
def prob_list(request):
    problems=Sudoku.objects.all()
    return render(request,'prob_list.html',{'problems':problems})
def my_problem(request):
    userr=request.user
    problems=Sudoku.objects.filter(created_user=userr)
    return render(request,'prob_list.html',{'problems':problems})
def add_prob(request):
    return render(request,"add_prob.html")
def saved(request):
    if request.method=="POST":
        problem=request.POST.get("board_data")
        arr=[]
        for i in range(9):
            row=[]
            for j in range(9):
                row.append(problem[i*9+j])
            arr.append(row)
        solution=[['0' for _ in range(9)] for _ in range(9)]
        problem2=json.dumps(arr)
        solution2=json.dumps(solution)
        userr=request.user
        prob=Sudoku(problem=problem2,solution=solution2,level="medium",created_user=userr)
        prob.save()
        return redirect("/sdk")
    return render(request,"saved.html")
def switch_prob(request):
    return render(request,"switch_prob.html")