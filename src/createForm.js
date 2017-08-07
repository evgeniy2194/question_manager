angular.module('app').component('createForm', {
    controller: CreateFormController,
    templateUrl: '/templates/form.html'
});

CreateFormController.$inject = ["Category"];
function CreateFormController(Category) {
    var ctrl = this;

    ctrl.question = {};
    ctrl.categories = Category.getAll();

    ctrl.onSaveClick = function () {
        console.log(ctrl.question);
    }
}
