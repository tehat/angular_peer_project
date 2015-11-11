/**
 * Created by Thomas on 11/11/15.
 */
var myApp = angular.module("myApp", []);
console.log("Step 1");

myApp.controller("PeopleController", ["$scope", '$http', function($scope, $http){
    console.log("Angular controller");

    $http.get('/data').then(function (response){
        $scope.people = response.data;

        //console.log("good data");

    });



}]);