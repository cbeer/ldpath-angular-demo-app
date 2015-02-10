angular.module('app.ldpathApp').controller("LdpathCtrl", [
  '$scope', '$http', function($scope, $http) {

    $scope.ldpath = { url: "", program: "", response: ""};
    $scope.response = { content: ""};

    $scope.$watchCollection('ldpath', function(newValue, oldValue) {
      $scope.evaluate(newValue);
    });

    $scope.aceLoaded = function(_editor) {
      // Context
      _editor.$http = $http;
      _editor.$ldpath = $scope.ldpath;
    };

    $scope.evaluate = function(ldpath) {
      if (ldpath.url.length == 0 || ldpath.program.length == 0) {
        return;
      }
      NProgress.start();

      $http.post("/evaluate", { url: ldpath.url, program: ldpath.program}).success(function(data,status) {
        $scope.response.content = JSON.stringify(data, null, 2);
        NProgress.done();
      });
    };
  }
])