(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodAddCtrl', GoodAddCtrl);

    GoodAddCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'GoodsService', '$ionicLoading'];

    function GoodAddCtrl($rootScope, $state, $stateParams, GoodsService, $ionicLoading) {
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
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function goodSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                price: vm.price,
                quantity: 0,
                store: false,
                description: vm.description
            };

            GoodsService.addItem(item)
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
