from django.urls import include, path, re_path
from django.contrib import admin
from rest_framework import routers
from raisins.auth import views
from raisins.candidates.views import CandidateJobStepViewSet, CandidateViewSet
from raisins.resume.views import FileUploadView
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'cjs', CandidateJobStepViewSet)
router.register(r'candidates', CandidateViewSet)

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    re_path(r'^resume/(?P<filename>[^/]+)$', FileUploadView.as_view()),
]
