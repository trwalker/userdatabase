// My Body Page Controller
app.controller('BodyCtrl', function($scope, $mdToast, $filter) {
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

  var date = new Date();

  // Add database entry.
  $scope.updateBody = function(userId, userName, weight, currentDate) {

    userId = user.uid;
    userName = user.displayName;
    weight = $scope.bodyWeight;
    currentDate = $filter('date')(new Date(), 'MM/dd/yyyy');

    database.ref('users/' + userId).set({
      user: userName,
      weight: weight,
      updated: currentDate
    });
    showToast("Your information has been recorded!");
  }

  // (TODO:SCOPE NOT UPDATING ON PAGE LOAD BUT DATA IS GETTING READ)
  var userId = firebase.auth().currentUser.uid;

  database.ref('/users/' + userId).on('value', function(snapshot) {

    console.log(snapshot.val().user);
    console.log(snapshot.val().weight);
    console.log(snapshot.val().updated);

    $scope.displayName = snapshot.val().user;
  });

});
