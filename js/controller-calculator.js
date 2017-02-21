(function () {
    angular
        .module('UserDatabase')
        .controller('CalculatorController', CalculatorController);

    CalculatorController.$inject = ['calculatorService'];

    function CalculatorController(calculatorService) {
        var vm = this;

        vm.showError = false;

        vm.aboutVisible = true;
        vm.nutritionVisible = false;
        vm.planVisible = false;

        vm.genderSelect = '';
        vm.genderError = false;

        vm.goalSelect = '';
        vm.goalError = false;

        vm.weightInput = 0;
        vm.weightPlaceholder = 'Enter weight';
        vm.weightError = false;

        vm.proteinOneInput = 0;
        vm.carbsOneInput = 0;
        vm.fatOneInput = 0;
        vm.dayOneError = false;

        vm.proteinTwoInput = 0;
        vm.carbsTwoInput = 0;
        vm.fatTwoInput = 0;
        vm.dayTwoError = false;

        vm.proteinThreeInput = 0;
        vm.carbsThreeInput = 0;
        vm.fatThreeInput = 0;
        vm.dayThreeError = false;

        vm.plan = null;

        vm.aboutContinueClick = aboutContinueClick;
        vm.nutritionContinueClick = nutritionContinueClick;

        var stats = {};
        var nutrition = { dayOne: {}, dayTwo: {}, dayThree: {}};

        function aboutContinueClick() {
            if(validateAboutInputs()) {
                vm.aboutVisible = false;
                vm.nutritionVisible = true;
                vm.showError = false;
            }
            else {
                vm.showError = true;
            }
        }

        function nutritionContinueClick() {
            if(validateNutritionInputs()) {
                vm.plan = calculatorService.calculatePlan(stats, nutrition);
                vm.plan[0].title = 'One/Two';
                vm.plan[1].title = 'Three/Four';
                vm.plan[2].title = 'Five/Six';

                vm.nutritionVisible = false;
                vm.showError = false;
                vm.planVisible = true;
            }
            else {
                vm.showError = true;
            }
        }

        function validateAboutInputs() {
            vm.goalError = !validateSelectInput(vm.goalSelect);
            vm.genderError = !validateSelectInput(vm.genderSelect);
            vm.weightError = !validateNumberInput(vm.weightInput);

            if(!vm.goalError && !vm.genderError && !vm.weightError) {
                stats.goal = vm.goalSelect;
                stats.gender = vm.genderSelect;
                stats.weight = vm.weightInput;

                return true;
            }

            return false;
        }

        function validateNutritionInputs() {
            vm.dayOneError = !validateNumberInput(vm.proteinOneInput) || !validateNumberInput(vm.carbsOneInput) || !validateNumberInput(vm.fatOneInput);
            vm.dayTwoError = !validateNumberInput(vm.proteinTwoInput) || !validateNumberInput(vm.carbsTwoInput) || !validateNumberInput(vm.fatTwoInput);
            vm.dayThreeError = !validateNumberInput(vm.proteinThreeInput) || !validateNumberInput(vm.carbsThreeInput) || !validateNumberInput(vm.fatThreeInput);

            if(!vm.dayOneError && !vm.dayTwoError && !vm.dayThreeError) {
                nutrition.dayOne.protein = vm.proteinOneInput;
                nutrition.dayOne.carbs = vm.carbsOneInput;
                nutrition.dayOne.fat = vm.fatOneInput;

                nutrition.dayTwo.protein = vm.proteinTwoInput;
                nutrition.dayTwo.carbs = vm.carbsTwoInput;
                nutrition.dayTwo.fat = vm.fatTwoInput;

                nutrition.dayThree.protein = vm.proteinThreeInput;
                nutrition.dayThree.carbs = vm.carbsThreeInput;
                nutrition.dayThree.fat = vm.fatThreeInput;

                return true;
            }

            return false;
        }

        function validateNumberInput(value) {
            return value > 0 && value < 1000;

        }

        function validateSelectInput(value) {
            return value.length !== 0;
        }
    }
})();
