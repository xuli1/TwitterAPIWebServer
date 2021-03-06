var app=angular.module('twitterApp',['ngSanitize']);
app.controller('QueryCtrl',['$scope','$http','$sce',function($scope,$http,$sce){
   // query term entered by user in textbox
   $scope.queryTerm='';
   // query data returned by Twitter API based on query term
   $scope.queryData=null;
   // embedded status from Twitter API for found Twitter ID
   $scope.embedStatus=null;
   // true only if valid Tweet id is found, so its latest tweet can be obtained
   $scope.tweetButtonAvail=false;
   // true only if embedded tweet is available to be displayed
   $scope.embedTweetAvail=false;
   $scope.queryTwitterApi=function(){
      // clear previous query result
      $scope.queryData=null;
      $scope.tweetButtonAvail=false;
      $scope.embedTweetAvail=false;
      $http({
         method: 'GET',
         url: '/twitterApp/queryTwitterApi',
         params: {
            'action': 'users/show',
            'queryKey': 'screen_name',
            'queryVal': $scope.queryTerm,
         }
      }).then(function successCallback(response){
         if (response.data.errors==null){
            // Tweet ID is found
            $scope.queryData=response.data;
            $scope.tweetButtonAvail=true;
         } else {
            // Tweet ID is not found
            $scope.queryData={
               'name': 'Twitter ID not found :(',
               'description': ''
            };
         }
      },function errorCallback(response){
         $scope.queryData=null;
      });
      $scope.queryTerm='';
   }
   $scope.queryEmbedStatus=function(id_str){
      $http({
         method: 'GET',
         url: '/twitterApp/queryTwitterApi',
         params: {
            'action': 'statuses/oembed',
            'queryKey': 'id',
            'queryVal': id_str
         }
      }).then(function successCallback(response){
         $scope.embedStatus=$sce.trustAsHtml(response.data.html);
         $scope.embedTweetAvail=true;
      },function errorCallback(response){
      });
   }
}]);
