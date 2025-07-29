from django.db import models
from django.contrib.auth.models import User
import json

class Sudoku(models.Model):
    problem=models.TextField()
    solution=models.TextField()
    level=models.CharField(max_length=10)
    created_user=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    def set_problem(self,grid):
        self.problem=json.dumps(grid)
    def get_problem(self):
        return json.loads(self.problem)
    def set_solution(self,grid):
        self.solution=json.dumps(grid)
    def get_solution(self):
        return json.loads(self.solution)
