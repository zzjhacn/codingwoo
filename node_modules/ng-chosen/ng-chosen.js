(function() {
    'use strict';

    function ChosenSelect() {
        this.link = this.link.bind(this);
    }

    ChosenSelect.prototype.link = function(scope, element) {
        if (!window.Chosen) {
            throw "I'm missing Chosen, please add it to the page";
        } else if (!window.angular) {
            throw "I'm missing angular, please add it to the page";
        } else {
            new Chosen(element[0], {});
        }
    };

    ChosenSelect.factory = function() {
        var ngChosen = new ChosenSelect();
        return {
            restrict: 'A',
            link: ngChosen.link
        };
    };

    angular.module('ng-chosen', [])
        .directive('ngChosen', ChosenSelect.factory);

})();