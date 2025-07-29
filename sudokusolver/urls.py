"""
URL configuration for sudokusolver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",views.signup),
    path("loginn",views.loginn),
    path("sdk",views.sdk),
    path("prob_list",views.prob_list,name='problems'),
    path("sudoku/<int:prob_id>",views.sudoku),
    path("my_problems",views.my_problem),
    path("add_prob",views.add_prob),
    path("saved",views.saved,name="saved_prob"),
    path("switch_prob",views.switch_prob),
]
