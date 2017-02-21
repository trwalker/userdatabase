// AngularJS Routes
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when("/home", {templateUrl: "partials/home.html", controller: "AppCtrl"})
  .when("/about", {templateUrl: "partials/about.html", controller: "AppCtrl"})
  .when("/myBody", {templateUrl: "partials/myBody.html", controller: "AppCtrl"})
  .when("/calculator", {templateUrl: "partials/calculator.html", controller: "CalculatorController"})
  .when("/login", {templateUrl: "partials/login.html", controller: "AppCtrl"})
  .when("/register", {templateUrl: "partials/register.html", controller: "AppCtrl"})
  .when("/profile", {templateUrl: "partials/profile.html", controller: "AppCtrl"})
  .when("/updateName", {templateUrl: "partials/updateName.html", controller: "AppCtrl"})
  .when("/updateEmail", {templateUrl: "partials/updateEmail.html", controller: "AppCtrl"})
  .when("/updatePassword", {templateUrl: "partials/updatePassword.html", controller: "AppCtrl"})
  .otherwise({redirectTo:"/home", template: "partials/home.html", controller: "AppCtrl"});
}]);
