var app=angular.module('twitterApp',['ngSanitize']);
app.controller('QueryCtrl',['$scope','$http','$sce',function($scope,$http,$sce){
   $scope.queryTerm='';
   $scope.queryData=null;
   $scope.embedStatus=null;
   $scope.queryTwitterApi=function(){
      $http({
         method: 'GET',
         url: '/twitterApp/queryTwitterApi',
         params: {
            screen_name: $scope.queryTerm,
         }
      }).then(function successCallback(response){
         $scope.queryData=response.data;
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
      },function errorCallback(response){
      });
   }
}]);
