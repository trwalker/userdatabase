// Primary App Controller
app.controller('AppCtrl', function($scope, $sce, $mdToast, $document) {
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
