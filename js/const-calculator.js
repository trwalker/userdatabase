(function() {
    var app = angular.module('UserDatabase');
    app.constant('CALC_INPUT_MALE', '0');
    app.constant('CALC_INPUT_FEMALE', '1');
    app.constant('CALC_INPUT_GAINER', '0');
    app.constant('CALC_INPUT_LOSER', '1');
    app.constant('MALE_FAT_FACTOR', 21);
    app.constant('FEMALE_FAT_FACTOR', 27);
    app.constant('MALE_PROTEIN_FACTORS', {
        small: {minWeight: 0, factor: 1.0},
        medium: {minWeight: 200, factor: 0.9},
        large: {minWeight: 241, protein: 0.8}
    });
    app.constant('FEMALE_PROTEIN_FACTORS', {
        small: { minWeight: 0, factor: 1.0 },
        medium: { minWeight: 170, factor: 0.9 },
        large: { minWeight: 201, factor: 0.8 }
    });
})();
