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
            screen_name: $scope.queryTerm,
         }
      }).then(function successCallback(response){
         $scope.queryData=response.data;
         $scope.tweetButtonAvail=true;
      },function errorCallback(response){
         $scope.queryData=null;
      });
      $scope.queryTerm='';
   }
   $scope.queryEmbedStatus=function(id_str){
      $http({
         method: 'GET',
         url: '/twitterApp/queryEmbedStatus',
         params: {
            id: id_str
         }
      }).then(function successCallback(response){
         $scope.embedStatus=$sce.trustAsHtml(response.data.html);
         $scope.embedTweetAvail=true;
      },function errorCallback(response){
      });
   }
}]);
