(function() {
    angular
        .module('UserDatabase')
        .factory('calculatorService', calculatorService);

    function calculatorService(CALC_INPUT_MALE, CALC_INPUT_GAINER, MALE_FAT_FACTOR, FEMALE_FAT_FACTOR, MALE_PROTEIN_FACTORS, FEMALE_PROTEIN_FACTORS) {

        function calculateWeekOneTwo(isMale, weight, nutrition) {
            var proteinAvg = Math.ceil((nutrition.dayOne.protein + nutrition.dayTwo.protein + nutrition.dayThree.protein) / 3);
            var carbsAvg = Math.ceil((nutrition.dayOne.carbs + nutrition.dayTwo.carbs + nutrition.dayThree.carbs) / 3);

            var proteinFactor = calculateProteinFactor(isMale, weight);
            var fatFactor = calculateFatFactor(isMale);

            /*****************************************************************

             x = fat week one/two
             x = (fatFactor * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)

             Male:
             x = (.30 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)
             9x = .30 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x))
             9x/.30 = (proteinAvg * 4) + (carbsAvg * 4) + (9x)
             30x - 9x = (proteinAvg * 4) + (carbsAvg * 4)
             21x = (proteinAvg * 4) + (carbsAvg * 4)

             x = ((proteinAvg * 4) + (carbsAvg * 4)) / 21

             Female:
             x = (.25 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x)) / 9)
             9x = .25 * ((proteinAvg * 4) + (carbsAvg * 4) + (9x))
             9x/.25 = (proteinAvg * 4) + (carbsAvg * 4) + (9x)
             36x - 9x = (proteinAvg * 4) + (carbsAvg * 4)
             27x = (proteinAvg * 4) + (carbsAvg * 4)

             x = ((proteinAvg * 4) + (carbsAvg * 4)) / 27

             Universal Equation
             x = ((proteinAvg * 4) + (carbsAvg * 4)) / fatFactor

             ******************************************************************/

            return {
                protein: Math.ceil(weight * proteinFactor),
                fat: Math.ceil(((proteinAvg * 4) + (carbsAvg * 4)) / fatFactor),
                carbs: carbsAvg
            }
        }

        function calculateProteinFactor(isMale, weight) {
            var proteinFactorData = isMale ? MALE_PROTEIN_FACTORS : FEMALE_PROTEIN_FACTORS;

            if (weight >= proteinFactorData.large.weight) {
                return proteinFactorData.large.factor;
            }
            else if(weight >= proteinFactorData.medium.weight) {
                return proteinFactorData.medium.factor;
            }

            return proteinFactorData.small.factor;
        }

        function calculateFatFactor(isMale) {
            return isMale ? MALE_FAT_FACTOR : FEMALE_FAT_FACTOR;
        }

        function calculateWeekThreeFour(isMale, isGainer, weekOneTwo) {
            var carbFactor = 0.95;
            if(isGainer) {
                carbFactor = isMale ? 1.10 : 1.05;
            }

            return {
                protein: weekOneTwo.protein,
                fat: weekOneTwo.fat,
                carbs: Math.ceil(weekOneTwo.carbs * carbFactor)
            }
        }

        function calculateWeekFiveSix(isGainer, weekThreeFour) {
            var carbFactor = 0.95;
            if(isGainer) {
                carbFactor = 1.05;
            }

            return {
                protein: weekThreeFour.protein,
                fat: weekThreeFour.fat,
                carbs: Math.ceil(weekThreeFour.carbs * carbFactor)
            }
        }

        return {
            calculatePlan: function(stats, nutrition) {
                var plan = [];

                var isMale = stats.gender === CALC_INPUT_MALE;
                var isGainer = stats.goal === CALC_INPUT_GAINER;

                var weekOneTwo = calculateWeekOneTwo(isMale, stats.weight, nutrition);
                var weekThreeFour = calculateWeekThreeFour(isMale, isGainer, weekOneTwo);
                var weekFiveSix = calculateWeekFiveSix(isGainer, weekThreeFour);

                plan.push(weekOneTwo);
                plan.push(weekThreeFour);
                plan.push(weekFiveSix);

                return plan;
            }
        };
    }
})();
