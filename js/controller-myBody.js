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

  database.ref('/users/' + userId +'/records/REC1').on('value', function(snapshot) {
    $timeout(function() {
        $scope.displayName = user.displayName;
        $scope.userWeight = snapshot.val().weight;
        $scope.userChest = snapshot.val().chest;
        $scope.userWaist = snapshot.val().waist;
        $scope.userHips = snapshot.val().hips;
        $scope.userFat = snapshot.val().fat;
        $scope.updated = snapshot.val().updated;
    });
  });

  // Add new record.
  $scope.addRecord = function($event) {
     var parentEl = angular.element(document.body);
     var recordID = firebase.database().ref().push().key;
     $mdDialog.show({
       parent: parentEl,
       targetEvent: $event,
       template:
         '<md-dialog id="recordDialog" aria-label="List dialog">' +
         '  <md-dialog-content class="md-dialog-content">'+
         '    <h2 class="md-title ng-binding">Add New Record</h2>' +
         '    <p class="ng-binding">Enter your information below.</p>' +
         '    <md-input-container class="md-block">' +
         '      <label>Enter your body weight (in pounds)...</label>' +
         '      <input ng-model="recordWeight" type="text">' +
         '    </md-input-container>' +
         '    <md-input-container class="md-block">' +
         '      <label>Enter your chest width (in inches)...</label>' +
         '      <input ng-model="recordChest" type="text">' +
         '    </md-input-container>' +
         '    <md-input-container class="md-block">' +
         '      <label>Enter your waist width (in inches)...</label>' +
         '      <input ng-model="recordWaist" type="text">' +
         '    </md-input-container>' +
         '    <md-input-container class="md-block">' +
         '      <label>Enter your hip width (in inches)...</label>' +
         '      <input ng-model="recordHip" type="text">' +
         '    </md-input-container>' +
         '    <md-input-container class="md-block">' +
         '      <label>Enter your body fat percentage...</label>' +
         '      <input ng-model="recordFat" type="text">' +
         '    </md-input-container>' +
         '  </md-dialog-content>' +
         '  <md-dialog-actions>' +
         '    <md-button ng-click="closeDialog()" class="md-primary">' +
         '      Cancel' +
         '    </md-button>' +
         '    <md-button ng-click="createRecord()" class="md-primary">' +
         '      Add Record' +
         '    </md-button>' +
         '  </md-dialog-actions>' +
         '</md-dialog>',
       locals: {
         weight: $scope.recordWeight,
         chest: $scope.recordChest,
         waist: $scope.recordWaist,
         hips: $scope.recordHip,
         fat: $scope.recordFat
       },
       controller: DialogController
    });
    function DialogController($scope, $mdDialog) {
      var chest = "1";
      var waist = "1";
      var hips = "1";
      var fat = "1";

      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
      $scope.createRecord = function() {
        database.ref('users/' + userId + '/records/' + recordID).set({
          weight: $scope.recordWeight,
          chest: $scope.recordChest,
          waist: $scope.recordWaist,
          hips: $scope.recordHip,
          fat: $scope.recordFat,
          updated: currentDate
        });
        $mdDialog.hide();
        showToast("Your record has been added!");
      }
    }
  }

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

        database.ref('users/' + userId + '/records/REC1').update({
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

        database.ref('users/' + userId +'/records/REC1').update({
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

        database.ref('users/' + userId +'/records/REC1').update({
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

        database.ref('users/' + userId +'/records/REC1').update({
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

        database.ref('users/' + userId +'/records/REC1').update({
          fat: fat,
          updated: currentDate
        });
        showToast("Your information has been updated!");
    }, function() {
      // Cancel actions go here.
    });
  };

});
