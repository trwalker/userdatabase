// Primary App Controller
app.controller('AppCtrl', function($scope, $sce, $mdToast, $document) {
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

  // Create login link.
  $scope.snippet = "<a href='#/login'>Login/Register</a>";
  $scope.userStatus = function() {
    return $sce.trustAsHtml($scope.snippet);
  };

  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    // User Information
    var user = firebase.auth().currentUser;

    if (user) {
      email = user.email;
      displayName = user.displayName;
      uid = user.uid;

      // Update header text with user information.
      $scope.snippet = "Welcome back, "+ displayName +"!" +
      " <a href='#/profile'>View Profile</a>";
      $scope.userStatus = function() {
        return $sce.trustAsHtml($scope.snippet);
      };

      //console.log("Provider-specific UID: "+uid);
      //console.log("Email: "+email);
    } else {

      // Update header text with login link.
      $scope.snippet = "<a href='#/login'>Login/Register</a>";
      $scope.userStatus = function() {
        return $sce.trustAsHtml($scope.snippet);
      };
    }
  });

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

  // Firebase - Sign In User
  $scope.signInUser = function () {
    email = $scope.email;
    password = $scope.password;

    auth.signInWithEmailAndPassword(email, password).then(function(value) {
      window.location = "#/home";

      var toastContent = "Thanks for signing in "+ email +"!";
      showToast(toastContent);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/invalid-email') {
        showToast(errorMessage);
      } else {
        showToast(errorMessage);
      }
    });
  }

  // Firebase - Create User
  $scope.writeUserData = function() {
    email = $scope.email;
    password = $scope.password;

    auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      window.location = "#/home";

      var toastContent = "Thanks for signing up "+ email +"!";
      showToast(toastContent);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        showToast(errorMessage);
      } else {
        showToast(errorMessage);
      }
    });
  }
});
