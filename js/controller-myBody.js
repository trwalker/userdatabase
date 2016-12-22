// My Body Page Controller
app.controller('BodyCtrl', function($scope, $mdToast, $filter, $timeout, $mdDialog) {
  // Variables
  var user = firebase.auth().currentUser;
  var userId = firebase.auth().currentUser.uid;
  var date = new Date();
  var currentDate = $filter('date')(new Date(), 'MM/dd/yyyy');
  var toastContent = null;

  function showToast(toastContent) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(toastContent)
        .position('bottom right')
        .hideDelay(3000)
    );
  };

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

  // Update base weight.
  $scope.updateWeight = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('What is your starting weight?')
      .textContent('Enter your starting weight below.')
      .placeholder('Enter your starting weight...')
      .ariaLabel('Starting Weight')
      .initialValue($scope.userWeight)
      .targetEvent(ev)
      .ok('Update')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
        // Add database entry.
        weight = result;

        database.ref('users/' + userId).update({
          weight: weight,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

  // Update base chest.
  $scope.updateChest = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('What is your starting chest width?')
      .textContent('Enter your starting chest width below.')
      .placeholder('Enter your starting chest width...')
      .ariaLabel('Starting Chest Width')
      .initialValue($scope.userChest)
      .targetEvent(ev)
      .ok('Update')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
        // Add database entry.
        chest = result;

        database.ref('users/' + userId).update({
          chest: chest,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

  // Update base waist.
  $scope.updateWaist = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('What is your starting waist width?')
      .textContent('Enter your starting waist width below.')
      .placeholder('Enter your starting waist width...')
      .ariaLabel('Starting Waist Width')
      .initialValue($scope.userWaist)
      .targetEvent(ev)
      .ok('Update')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
        // Add database entry.
        waist = result;

        database.ref('users/' + userId).update({
          waist: waist,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

  // Update base hips.
  $scope.updateHips = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('What is your starting hip width?')
      .textContent('Enter your starting hip width below.')
      .placeholder('Enter your starting hip width...')
      .ariaLabel('Starting Hip Width')
      .initialValue($scope.userHips)
      .targetEvent(ev)
      .ok('Update')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
        // Add database entry.
        hips = result;

        database.ref('users/' + userId).update({
          hips: hips,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

  // Update base body fat.
  $scope.updateFat = function(ev) {
    var confirm = $mdDialog.prompt()
      .title('What is your starting body fat percentage?')
      .textContent('Enter your starting body fat percentage below.')
      .placeholder('Enter your starting body fat percentage...')
      .ariaLabel('Starting Body Fat Percentage')
      .initialValue($scope.userFat)
      .targetEvent(ev)
      .ok('Update')
      .cancel('Cancel');

    $mdDialog.show(confirm).then(function(result) {
        // Add database entry.
        fat = result;

        database.ref('users/' + userId).update({
          fat: fat,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

});
