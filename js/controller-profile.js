// Profile Page Controller
app.controller('ProfileCtrl', function($scope, $mdToast) {
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

  // Firebase Current User
  var user = firebase.auth().currentUser;

  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    if (user) {
      $scope.userEmail = user.email;
      $scope.userDisplayName = user.displayName;
      $scope.userID = user.uid;

    } else {
      // Do something if not logged in.
    }
  });

  // Updates the user display name.
  $scope.updateDisplayName = function() {

    displayNameInput = $scope.displayName;

    user.updateProfile({
      displayName: displayNameInput
    }).then(function() {
      $scope.userDisplayName = user.displayName;
      displayName = $scope.userDisplayName;

      var toastContent = "You've updated your profile "+ displayName +"! Refresh to see changes.";
      showToast(toastContent);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      showToast(errorMessage);
    });
  }

  // Updates the user email address.
  $scope.updateEmail = function() {

    emailInput = $scope.email;

    user.updateEmail(emailInput).then(function() {
      email = user.email;

      var toastContent = "You've updated your email address to "+ email +"!";
      showToast(toastContent);
    }, function(error) {
      // An error happened.
    });
  }

  // Updates the user password
  $scope.updatePassword = function() {

    passwordInput = $scope.password;

    user.updatePassword(passwordInput).then(function() {
      var toastContent = "You've updated your password!";
      showToast(toastContent);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      showToast(errorMessage);
    });
  }
});
