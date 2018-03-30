(function () {

    const taskList = {
        templateUrl: 'app/task/components/task-list.html',
        controller: function (TaskService) {
            let vm = this;

            TaskService.getTasks().then(tasks => vm.tasks = tasks);

            vm.addTask = function (newTask) {
                TaskService.addTask(newTask);
                newTask.name = '';
            };

            vm.deleteTask = function (id) {
                TaskService.deleteTask(id);
            };
        }
    };

    const taskComments = {
        templateUrl: 'app/task/components/task-comments.html',
        controller: function ($stateParams, TaskService) {
            const vm = this;
            const taskId = parseInt($stateParams.taskId);

            TaskService.getTaskComments(taskId).then(([task]) => {
                vm.task = task;
            });

            vm.addTaskComment = function (event, comment = {text: ''}) {
                if(comment.text !== '' && event.ctrlKey || event.keyCode === 17 && event.keyCode === 13) {
                    TaskService.addTaskComment(taskId, comment)
                    comment.text = '';
                }
            };
        }
    };

    angular.module('task.components', [
        'task.services'
    ])
    .component('taskList', taskList)
    .component('taskComments', taskComments)
    ;

}())
