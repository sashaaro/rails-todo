// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
	var $todoList = $('.well-project-todo');

	$todoList.find('input[type=checkbox]')
		.iCheck({
			checkboxClass: 'icheckbox_square-blue'
		})
		.on('ifToggled', function() {
			var todo = {
				id: $(this).data('id'),
				isCompleted: this.checked
			}

			$.ajax('/todos/change_status', {
				method: 'POST',
				data: todo
			})
		});

	var select2Options = {
		width: 'resolve',
		minimumResultsForSearch: -1,
		placeholder: "Категория",
  		//allowClear: true
	};

	var $modal = $('.modal.modal-todo')
	var $form = $modal.find('form');

	select2Options.dropdownParent = $modal;
	$form.find('select').select2(select2Options);

	var $showFormButton = $('.btn-show-form');
	var isSubmited = $form.data('submited');

	$modal.on('shown.bs.modal', function() {
		$modal.find('select').select2(select2Options);
	});

	$modal.on('hidden.bs.modal', function() {
		// Reset form
		$form.find('.help-block').remove();
		$form.trigger('reset');
	});	


	if (isSubmited) {
		$modal.modal('show');
	}
});
