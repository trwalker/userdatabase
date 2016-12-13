// Nutrition Page Controller
app.controller('NutritionCtrl', function($scope) {
  $scope.user = {
    gender: 'Female',
    goal: 'Lose Weight',
    weight: null,
    dayOneProtein: '150',
    dayOneCarbs: '250',
    dayOneFat: '50',
    dayTwoProtein: null,
    dayTwoCarbs: null,
    dayTwoFat: null,
    dayThreeProtein: null,
    dayThreeCarbs: null,
    dayThreeFat: null
  };

  $scope.genders = ('Male Female').split(' ').map(function(gender) {
    return {abbrev: gender};
  });
  $scope.goals = ('Lose Weight_Gain Weight').split('_').map(function(goal) {
    return {abbrev: goal};
  });
});
