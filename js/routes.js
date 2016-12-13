// AngularJS Routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when("/home", {templateUrl: "partials/home.html", controller: "AppCtrl"})
  .when("/about", {templateUrl: "partials/about.html", controller: "AppCtrl"})
  .when("/login", {templateUrl: "partials/login.html", controller: "AppCtrl"})
  .when("/register", {templateUrl: "partials/register.html", controller: "AppCtrl"})
  .when("/profile", {templateUrl: "partials/profile.html", controller: "AppCtrl"})
  .when("/update", {templateUrl: "partials/update.html", controller: "AppCtrl"})
  .otherwise({redirectTo:"/home", template: "partials/home.html", controller: "AppCtrl"});
}]);
