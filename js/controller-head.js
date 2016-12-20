// Primary App Controller
app.controller('HeadCtrl', function($scope, $mdToast, $document, $timeout) {
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

    $timeout(function() {
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
        $scope.isUser = false;
        $scope.notUser = true;

        //console.log("Provider-specific UID: "+uid);
        //console.log("Email: "+email);
      } else {
        $scope.currentNavItem = "home";
        $scope.userStatus = "Logged Out";
        $scope.isUser = true;
        $scope.notUser = false;
      }
    });
  });

  // User Menu Actions
  $scope.menuClear = function () {
    $scope.currentNavItem = null;
  }
});
