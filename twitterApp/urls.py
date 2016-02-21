from django.conf.urls import patterns,url
from twitterApp import views

urlpatterns=patterns(
   '',
   url(r'^$',views.index,name='index'),
   url(r'^queryTwitterApi/$',views.queryTwitterApi,name='queryTwitterApi'),
)
