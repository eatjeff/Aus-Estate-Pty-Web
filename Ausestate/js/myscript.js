'use strict';

angular.module('ausestateApp', [])
        
        .controller('IndexController', ['$scope', function($scope) {
            
            $scope.accountInfo = {username:"", password:""};
            
        }])

        .controller('LoginController', ['$scope', function($scope) {
            $scope.sendAccount = function() {
                
                console.log($scope.accountInfo);
            };
            
        }]);
