var DependentCheckboxes = function(container) {
    this.container = container;
    this.masterSwitch = this.container.find('.check-all');
    this.checkboxes = this.container.find('input[type="checkbox"]').not(this.masterSwitch);

	this.container.on('change', 'input[type="checkbox"]', this.fireEvent.bind(this));
};

DependentCheckboxes.prototype.fireEvent = function(e) {
	var data = $(e.currentTarget).data();
	if (Object.getOwnPropertyNames(data).length) {
		if (data.group) {
			this.handleGroup(data.group, e.currentTarget.checked);
		}

		if (data.category) {
			this.handleSingle(data.category, e.currentTarget.checked);
		}
	} else {
		this.handleAll(e.currentTarget.checked);
	}

	this.handleParent(this.checkboxes, e.currentTarget.checked, this.masterSwitch);
};

DependentCheckboxes.prototype.handleAll = function(status) {
	this.change(this.checkboxes, status);
};

DependentCheckboxes.prototype.handleGroup = function(name, changeTo) {
	var checkboxes = this.getCheckboxes(name);
	this.change(checkboxes, changeTo);
};

DependentCheckboxes.prototype.handleSingle = function(name, status) {
	var others = this.getCheckboxes(name);
	var currentGroup = this.filterCollection('group', name);

	this.handleParent(others, status, currentGroup);
};

DependentCheckboxes.prototype.handleParent = function(group, status, parent) {
	if (this.allTheSame(group, status)) {
		this.change(parent, status);
	} else {
		this.change(parent, false);
	}
};

DependentCheckboxes.prototype.getCheckboxes = function(category) {
	if (category) {
		return this.filterCollection('category', category);
	}
	return this.checkboxes;
};

DependentCheckboxes.prototype.change = function(checkboxes, changeTo) {
	var len = checkboxes.length;
	for (var i = 0; i < len; i++) {
		checkboxes[i].checked = changeTo;
	}
};

DependentCheckboxes.prototype.allTheSame = function(checkboxes, status) {
	var len = checkboxes.length;
	for (var i = 0; i < len; i++) {
		if (checkboxes[i].checked !== status) {
			return false;
		}
	}
	return true;
};

DependentCheckboxes.prototype.filterCollection = function(dataName, name) {
	return this.checkboxes.filter(function () {
		return $(this).data(dataName) === name;
	});
};