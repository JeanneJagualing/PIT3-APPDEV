from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from todos.views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)  # /todos/ endpoint

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # API root
    path('', RedirectView.as_view(url='/api/', permanent=False)),  # Redirect to API
]