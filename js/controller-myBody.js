// My Body Page Controller
app.controller('BodyCtrl', function($scope, $mdToast, $filter, $timeout) {
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
  $scope.updateBody = function(userId, userName, weight, chest, waist, hips, fat, currentDate) {

    userId = user.uid;
    userName = user.displayName;
    weight = $scope.bodyWeight;
    chest = $scope.bodyChest;
    waist = $scope.bodyWaist;
    hips = $scope.bodyHips;
    fat = $scope.bodyFat;
    currentDate = $filter('date')(new Date(), 'MM/dd/yyyy');

    database.ref('users/' + userId).set({
      user: userName,
      weight: weight,
      chest: chest,
      waist: waist,
      hips: hips,
      fat: fat,
      updated: currentDate
    });
    showToast("Your information has been recorded!");
  }

  // (TODO:SCOPE NOT UPDATING ON PAGE LOAD BUT DATA IS GETTING READ)
  var userId = firebase.auth().currentUser.uid;

  database.ref('/users/' + userId).on('value', function(snapshot) {
    $timeout(function() {
        $scope.displayName = snapshot.val().user;
        $scope.userWeight = snapshot.val().weight;
        $scope.userChest = snapshot.val().chest;
        $scope.userWaist = snapshot.val().waist;
        $scope.userHips = snapshot.val().hips;
        $scope.userFat = snapshot.val().fat;
        $scope.updated = snapshot.val().updated;
    });
  });

});
