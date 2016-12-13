// Profile Page Controller
app.controller('ProfileCtrl', function($scope) {
  // Firebase State Change
  auth.onAuthStateChanged(function(user) {
    // User Information
    var user = firebase.auth().currentUser;

    if (user) {
      $scope.userEmail = user.email;
      $scope.userID = user.uid;

    } else {

    }
  });
});
