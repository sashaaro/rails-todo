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

// Plugin modal window
var Modal = function($element) {
	this.$element = $element;
	this.showListener = null;
	this.hideListener = null;
}

Modal.currencyOpenModal = null

Modal.init = function() { // init modal plugin 
	$('body').on('click.modal', '.modal-backgroup', this.close.bind(this));
}

Modal.uninit = function() { // destroy modal plugin 
	$('body').off('click.modal');
}

Modal.close = function() { // close current opened window
	this.currencyOpenModal.hide();
	this.currencyOpenModal = null;
}

Modal.prototype.show = function() {
	$('body').append('<div class="modal-backgroup"></div>');
	this.$element.get(0).style.display = 'block';
	Modal.currencyOpenModal = this;
	if (this.showListener) {
		this.showListener.call(this);
	}
}

Modal.prototype.hide = function() {
	$('body').children('.modal-backgroup').remove();
	this.$element.get(0).style.display = 'none';
	if (this.hideListener) {
		this.hideListener.call(this);
	}
}

$(document).ready(function() {
	Modal.init();

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

	var $addTodoModal = $('.modal.modal-add-todo')
	var $form = $addTodoModal.find('form');
	var $showFormButton = $('.btn-show-form');
	var isSubmited = $form.data('submited');

	//select2Options.dropdownParent = $addTodoModal;
	
	$addTodoModal.find('select').select2(select2Options);

	var modalWindow = new Modal($addTodoModal);
	$showFormButton.on('click', function(e) {
		e.preventDefault();
		modalWindow.show();
	});

	modalWindow.showListener = function() {
		$form.find('select').select2(select2Options); // update select2 widget should rerender correct width
	};

	modalWindow.hideListener = function() { // when close todo form modal window..reset form
		// Reset form
		$form.find('.field-error').remove(); // remove error messages
		// TODO maybe $form.find('select').select2('reset')
		$form.trigger('reset');
	};


	if (isSubmited) { // if submit form was happened. should pre show modal
		modalWindow.show();
	}
});
