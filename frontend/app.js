
const app = angular.module('TodoApp', []);

app.controller('TodoController', function ($scope, $http) {
  $scope.todos = [];
  $scope.newTodo = "";

  $scope.loadTodos = function () {
    $http.get('https://todobackend-kqzl.onrender.com/api/todos').then(res => {
      $scope.todos = res.data;
    });
  };

  $scope.addTodo = function () {
    if (!$scope.newTodo) return;
    $http.post('https://todobackend-kqzl.onrender.com/api/todos', { title: $scope.newTodo }).then(() => {
      $scope.newTodo = "";
      $scope.loadTodos();
    });
  };

  $scope.toggleTodo = function (todo) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const completed = !todo.completed;
    $http.put(`https://todobackend-kqzl.onrender.com/api/todos/${todo.id}`, {
      completed: completed,
      completed_at: completed ? now : null
    }).then(() => {
      todo.completed = completed;
      todo.completed_at = completed ? now : null;
    });
  };

  $scope.deleteTodo = function (id) {
    $http.delete(`https://todobackend-kqzl.onrender.com/api/todos/${id}`).then(() => {
      $scope.loadTodos();
    });
  };

  $scope.formatDate = function (datetimeStr) {
    if (!datetimeStr) return '';
    return new Date(datetimeStr).toLocaleString();
  };

  $scope.loadTodos();
});
