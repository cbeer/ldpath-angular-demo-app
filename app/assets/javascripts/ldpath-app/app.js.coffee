@app = angular.module('app', [
  # additional dependencies here, such as restangular
  'templates'
])

@app.run(->
  console.log 'angular app running'
)