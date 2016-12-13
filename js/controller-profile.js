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

  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    // User Information
    var user = firebase.auth().currentUser;

    if (user) {
      $scope.userEmail = user.email;
      $scope.userDisplayName = user.displayName;
      $scope.userID = user.uid;

    } else {

    }
  });

  // Updates the user attributes:
  $scope.updateUserData = function() {
    // User Information
    var user = firebase.auth().currentUser;
    displayNameInput = $scope.displayName;

    user.updateProfile({
      displayName: displayNameInput
    }).then(function() {
      $scope.userDisplayName = user.displayName;
      displayName = $scope.userDisplayName;

      var toastContent = "You've updated your profile "+ displayName +"!";
      showToast(toastContent);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      showToast(errorMessage);
    });
  }
});
