(function () {
    'use strict';

    angular
        .module('app')
        .controller('ClientDetailsCtrl', ClientDetailsCtrl);

    ClientDetailsCtrl.$inject = ['$rootScope', '$state', '$stateParams', '$filter', 'ClientsService', '$ionicLoading'];

    function ClientDetailsCtrl($rootScope, $state, $stateParams, $filter, ClientsService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSubmit: showSubmit,
            clientSubmit: clientSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
            vm.total = $filter('number')(vm.sum, 2);
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function clientSubmit() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var item = {
                id: vm.id,
                name: vm.name,
                address: vm.address,
                phone: vm.phone,
                sum: vm.sum,
                cv: vm.cv,
                description: vm.description
            };

            ClientsService.editItem(item)
                .then(function () {
                    $ionicLoading.hide();
                    $state.go('root.clients', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }

})();
