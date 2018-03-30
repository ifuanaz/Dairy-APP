(function () {

    function configure ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '',
            })
            ;
        $urlRouterProvider.otherwise('/')
    }

    angular.module('app', [
        'ui.router',
        'task.states'
    ])
    .config(configure)
    ;

}());
