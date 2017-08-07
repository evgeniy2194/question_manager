angular.module("app").factory('Category', ['$resource', function ($resource) {
    return $resource('/categories', {}, {
        getAll: {
            url: '/categories',
            method: 'GET',
            isArray: true
        }
    });
}]);