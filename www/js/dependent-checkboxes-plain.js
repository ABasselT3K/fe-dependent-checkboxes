'use strict';
var DependentCheckboxes = function(container) {
    this.container = container;
    this.checkboxes = Array.prototype.slice.call(this.container.querySelectorAll('input[type="checkbox"]'));
    this.master = this.container.querySelector('.check-all');
    
    this.container.addEventListener('change', this.fireEvent.bind(this));
};

DependentCheckboxes.prototype.fireEvent = function(ev) {
	var current = ev.target;

	if (Object.getOwnPropertyNames(current.dataset).length) {
		if (current.dataset['category']) {
			this.single(current.dataset['category'], current.checked);
		}
		if (current.dataset['group']) {
			this.change(this.container.querySelectorAll('input[data-category="'+ current.dataset['group'] +'"]'), current.checked);
		}
		this.change([this.master], this.allTheSame(this.checkboxes.slice(1,-1), true));
	} else {
		this.change(this.checkboxes, current.checked);
	}
};

DependentCheckboxes.prototype.single = function(name, checked) {
	var siblings = this.container.querySelectorAll('input[data-category="'+ name +'"]');
	var parent =  this.container.querySelector('input[data-group="'+ name +'"]');
	this.change([parent], this.allTheSame(siblings, true));
};

DependentCheckboxes.prototype.change = function(checkboxes, checked) {
	for (let i = 0, len = checkboxes.length; i < len; i++) {
		checkboxes[i].checked = checked;
	}
};

DependentCheckboxes.prototype.allTheSame = function(checkboxes, checked) {
	for (let i = 0, len = checkboxes.length; i < len; i++) {
		if (checkboxes[i].checked !== checked) {
			return false;
		}
	}
	return true;
};