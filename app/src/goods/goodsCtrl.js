(function () {
    'use strict';

    angular
        .module('app')
        .controller('GoodsCtrl', GoodsCtrl);

    GoodsCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'GoodsService',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function GoodsCtrl($scope, $rootScope, $state, $stateParams, GoodsService, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showAdd: showAdd,
            addConfirm: addConfirm,
            showConfirm: showConfirm,
            goodDelete: goodDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            goodAdd: goodAdd,
            goodDetails: goodDetails
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.goods = [];
            vm.goodsFilter = [];
            vm.clear = false;
            vm.addShowed = false;
            $rootScope.raisedError = false;

            GoodsService.getGoods()
                .then(function (result) {
                    vm.goods = result.data;
                    $ionicLoading.hide();
                })
                .catch(errorHandler);
        }

        function showAdd() {
            vm.addShowed = vm.addShowed ? false : true;
        }

        function addConfirm(good) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Add good',
                template: 'Are you sure you want to add new good?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        function showConfirm(good) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete good',
                template: 'Are you sure you want to delete ' + good.name + '?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    goodDelete(good.id);
                } else {
                    $ionicListDelegate.closeOptionButtons();
                    console.log('You are not sure');
                }
            });
        }

        function goodDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            GoodsService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);

            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.goods = [];
            vm.clear = false;
            GoodsService.getGoods()
                .then(function (result) {
                    vm.goods = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .catch(errorHandler);
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function goodAdd() {
            $state.go('root.good-add');
        }

        function goodDetails(item) {
            $state.go('root.good-details', {item: item});
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }
})();