(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;
        vm.orgs = [
            {
                id: 1,
                name: 'Department A',
                children: [
                    {
                        id: 2,
                        name: 'Team 1-1'
                    },
                    {
                        id: 3,
                        name: 'Team 1-2'
                    }

                ]
            },
            {
                id: 4,
                name: 'Department B',
                children: [
                    {
                        id: 5,
                        name: 'Team 2-1'
                    },
                    {
                        id: 6,
                        name: 'Team 2-2',
                        children: [
                            {
                                id: 7,
                                name: 'Subteam 2-2-1'
                            },
                            {
                                id: 8,
                                name: 'Subteam 2-2-2'
                            }
                        ]
                    }
                ]
            }
        ];

        vm.changeItem = function (value) {
            vm.selectedItem = value;
        };

        vm.isDisabled = false;

        vm.activeItem = {
            id: 2
        };
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
