// Primary App Controller
app.controller('NavCtrl', function($scope, $mdToast, $document) {
  // Menu Item Selection
  var url = document.URL;
  var array = url.split('/');
  var pathname = array[array.length-1];

  //console.log("Pathname: "+pathname);
  $scope.currentNavItem = pathname;
  $scope.hideProfile = true;

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

      $scope.hideLogin = true;
      $scope.hideProfile = false;

      //console.log("Provider-specific UID: "+uid);
      //console.log("Email: "+email);
    } else {
      $scope.currentNavItem = "home";

      $scope.hideLogin = false;
      $scope.hideProfile = true;
    }
  });
});
