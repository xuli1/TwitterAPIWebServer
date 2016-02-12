var app=angular.module('twitterApp',[]);
app.controller('QueryCtrl',['$scope','$http',function($scope,$http){
   $scope.queryTerm='';
   $scope.queryData=null;
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
}]);
