(function (){

    function configure ($stateProvider) {
        $stateProvider
            .state('app.task', {
                url: '/',
                views: {
                    '': {
                        component: 'taskList'
                    }
                }
            })
            .state('app.comments', {
                url: '/task/:taskId/comments',
                views: {
                    '': {
                        component: 'taskComments'
                    }
                }
            })
            ;
    }

    angular.module('task.states', [
        'task.components'
    ])
    .config(configure);

}());
