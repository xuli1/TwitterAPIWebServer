from auth import CONSUMER_KEY, CONSUMER_SECRET
from TwitterAPI import TwitterAPI
from django.http import HttpResponse
from django.template import loader,RequestContext

'''
global variable for TwitterAPI object within this module
because Python do not allow variable declaration only
it is temporarily assigned empty string
correctly initialized in queryTwitterApi()
'''
api=''

def index(request):
   '''
   provide response for index page
   '''
   template = loader.get_template('twitterApp/index.html')
   context=RequestContext(request,{})
   return HttpResponse(template.render(context))

def queryTwitterApi(request):
   '''
   query Twitter API using TwitterAPI python wrapper lib
   and return TWitter API response in JSON format

   IMPORTANT:
   application-only authentication is required for accessing Twitter API

   a Twitter app must be created with Twitter and corresponding consumer key and secret generated.
   ensure key and secret stored in auth.py

   handles GET request with 'action' parameter for Twitter API type, such as 'user/show',
   'queryKey', such as 'screen_name' for 'user/show' query,
   'queryVal' for actual query value
   '''
   global api
   if api=='':
      # TwitterAPI object has not been initialized
      # obtain appliation-only authentication and initialize object
      api=TwitterAPI(CONSUMER_KEY,
                     CONSUMER_SECRET,
                     auth_type='oAuth2')

   # perform TwitterAPI query and return response body
   action=request.GET['action'];
   queryKey=request.GET['queryKey'];
   queryVal=request.GET['queryVal'];
   resp=api.request(action,{queryKey: queryVal})
   return HttpResponse(resp.text)
