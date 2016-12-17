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

  // Firebase - Sign Out User
  $scope.signOutUser = function() {
    auth.signOut().then(function() {
      window.location = "#/home";

      var toastContent = "You are now signed out.";
      showToast(toastContent);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      showToast(errorMessage);
    });
  }

  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    // User Information
    var user = firebase.auth().currentUser;

    if (user) {
      email = user.email;
      displayName = user.displayName;
      uid = user.uid;

      $scope.currentNavItem = "home";

      if (user.displayName == null) {
        $scope.userStatus = "Welcome, "+ email +"!";
      } else {
        $scope.userStatus = "Welcome back, "+ displayName +"!";
      }
      $scope.hideLogin = true;
      $scope.hideCreate = true;
      $scope.hideProfile = false;
      $scope.hideChangeName = false;
      $scope.hideLogout = false;

      //console.log("Provider-specific UID: "+uid);
      //console.log("Email: "+email);
    } else {
      $scope.currentNavItem = "home";
      $scope.userStatus = "Logged Out";
      $scope.hideLogin = false;
      $scope.hideCreate = false;
      $scope.hideProfile = true;
      $scope.hideChangeName = true;
      $scope.hideLogout = true;
    }
  });

  // User Menu Actions
  $scope.menuClear = function () {
    $scope.currentNavItem = null;
  }
});