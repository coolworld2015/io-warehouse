(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodDetailsCtrl', GoodDetailsCtrl);

    GoodDetailsCtrl.$inject = ['$rootScope', '$state', '$stateParams', '$filter', 'GoodsService', '$ionicLoading'];

    function GoodDetailsCtrl($rootScope, $state, $stateParams, $filter, GoodsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSubmit: showSubmit,
            goodSubmit: goodSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
            vm.price = $filter('number')(vm.price, 2);
            vm.quantity = $filter('number')(vm.quantity, 2);
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function goodSubmit() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var item = {
                id: vm.id,
                name: vm.name,
                price: vm.price,
                quantity: vm.quantity,
                store: vm.store,
                description: vm.description
            };

            GoodsService.editItem(item)
                .then(function () {
                    $ionicLoading.hide();
                    $state.go('root.goods', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }

})();
