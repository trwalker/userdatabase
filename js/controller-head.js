// Primary App Controller
app.controller('HeadCtrl', function($scope, $mdToast, $document) {
  // Menu Item Selection
  var url = document.URL;
  var array = url.split('/');
  var pathname = array[array.length-1];

  //console.log("Pathname: "+pathname);
  $scope.currentNavItem = pathname;

  // Toasts
  var toastContent = null;

  function showToast(toastContent) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(toastContent)
        .position('bottom right')
        .hideDelay(3000)
    );
  };

  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    // User Information
    var user = firebase.auth().currentUser;

    if (user) {
      email = user.email;
      displayName = user.displayName;
      uid = user.uid;

      $scope.currentNavItem = "home";
      $scope.userStatus = "Welcome back, "+ displayName +"!";
      $scope.hideLogin = true;
      $scope.hideCreate = true;
      $scope.hideProfile = false;
      $scope.hideUpdateProfile = false;

      //console.log("Provider-specific UID: "+uid);
      //console.log("Email: "+email);
    } else {
      $scope.currentNavItem = "home";
      $scope.userStatus = "Logged Out";
      $scope.hideLogin = false;
      $scope.hideCreate = false;
      $scope.hideProfile = true;
      $scope.hideUpdateProfile = true;
    }
  });

  // User Menu Actions
  $scope.loginLink = function () {
    $scope.currentNavItem = null;
  }

  $scope.registerLink = function () {
    $scope.currentNavItem = null;
  }

  $scope.profileLink = function () {
    $scope.currentNavItem = null;
  }

  $scope.updateLink = function () {
    $scope.currentNavItem = null;
  }
});
