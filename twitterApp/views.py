from twitterApp import settings
import base64
import requests
import urllib
import re
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader,RequestContext

def index(request):
   """
   """
   template = loader.get_template('twitterApp/index.html')
   context=RequestContext(request,{})
   return HttpResponse(template.render(context))

def queryTwitterApi(request):
   headers={
      'Authorization': 'Bearer ' + getBearerToken(),
   }
   urlStr='https://api.twitter.com/1.1/search/tweets.json?q=' + urllib.quote_plus(request.GET['q'])
   resp=requests.get(urlStr,headers=headers)
   return HttpResponse(resp)

# obtain Twitter bearer token from Twitter api website
# return: bearer token string
#
# Note: authorization string is pre-calculated based on app credential and is in base64 format
def getBearerToken():
   # create static variable using function attribute, token, to hold bearer token
   if getBearerToken.token == '':
      # bearer token has not been initialized
      # send POST request to Twitter api server
      bearerTokenCredential=genBearerTokenCred64(urlEncodeConsumerKey(settings.CONSUMER_KEY),urlEncodeConsumerSecret(settings.CONSUMER_SECRET))
      headers={
         'Authorization': 'Basic ' + bearerTokenCredential,
         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      requestBody='grant_type=client_credentials'
      r=requests.post('https://api.twitter.com/oauth2/token',headers=headers,data=requestBody)

      # responose body contain bearer token
      regex=re.compile('"access_token":"(.+)"')
      result=regex.search(r.text)
      getBearerToken.token=result.group(1)

   return getBearerToken.token
# function attribute must be initialized
getBearerToken.token=''

def genBearerTokenCred64(encodedConsumerKey, encodedConsumerSecret):
   '''
   generate bearer token credential in base64 encoding from encoded consumer key and secret
   '''
   return base64.b64encode(encodedConsumerKey + ':' + encodedConsumerSecret)

def urlEncodeConsumerKey(consumerKey):
   '''
   url encode consumer key  

   implementation detail may change in future
   '''
   return consumerKey

def urlEncodeConsumerSecret(consumerSecret):
   '''
   url encode consumer secret

   implementation detail may change in future
   '''
   return consumerSecret
