(function () {

    function TaskService ($http, $q) {
        let tasks = [
            {id: 1, name: 'Task 1', comments: [
                {id: 1, text: 'Lorem ipsum dolor sit amet.'}
            ]},
            {id: 2, name: 'Task 2', comments: [
                {id: 1, text: 'Lorem ipsum dolor sit amet.2'},
                {id: 2, text: 'Lorem ipsum dolor sit amet.2'}
            ]},
            {id: 3, name: 'Task 3', comments: [
                {id: 1, text: 'Lorem ipsum dolor sit amet.3'},
                {id: 2, text: 'Lorem ipsum dolor sit amet.3'}
            ]}
        ];

        const service = {
            getTasks: getTasks,
            addTask: addTask,
            deleteTask: deleteTask,
            getTaskComments: getTaskComments,
            addTaskComment: addTaskComment
        };

        // Save data to localstorage
        function saveTasksToLocalStorage() {
            let str = JSON.stringify(tasks);
            localStorage.setItem('tasks', str);
        };

        function getTasks () {
            let deferred = $q.defer();
            let data = JSON.parse(localStorage.getItem('tasks'));

            if(data !== null) {
                tasks = [...data];
                deferred.resolve(tasks);
            }
            else {
                deferred.resolve(tasks);
                saveTasksToLocalStorage();
            }

            return deferred.promise;
        };

        function addTask (newTask) {
            const id = parseInt(Date.parse(new Date()));
            const copiedTask = Object.assign({}, newTask, { id: id, comments: [] });
            tasks.push(copiedTask);
            saveTasksToLocalStorage();
        };

        function deleteTask (id) {
            _.remove(tasks, {id: id});
            saveTasksToLocalStorage();
        };

        function getTaskComments (id) {
            let deferred = $q.defer();
            let data = JSON.parse(localStorage.getItem('tasks'));

            if(data !== null) {
                tasks = [...data];
                let currentTask = _.filter(tasks, {id: id});
                deferred.resolve(currentTask);
            }

            return deferred.promise;
        }

        function addTaskComment (taskId, comment) {
            _.filter(tasks, (task) => {
                if(task.id === taskId) {
                    const id = parseInt(Date.parse(new Date()));
                    const copiedComment = Object.assign({}, comment, {id: id});

                    task.comments.push(copiedComment);
                    saveTasksToLocalStorage();
                }
            })
        }

        return service;
    }

    angular.module('task.services', [])
    .service('TaskService', TaskService)
    ;

}());
