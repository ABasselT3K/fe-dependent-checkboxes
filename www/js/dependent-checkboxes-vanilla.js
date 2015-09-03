var DependentCheckboxes = function(container) {
    this.container = container;
    this.allCheckboxes = this.container.querySelectorAll('input[type="checkbox"]');
    this.allGroups = this.container.querySelectorAll('input[data-group]');
    this.checkAllCheckbox = this.container.querySelector('.check-all');

    this.container.addEventListener('change', this.handleCheck.bind(this), false);
};

DependentCheckboxes.prototype.handleCheck = function(e) {
    var trigger = e.target;

    if (trigger.classList.contains('check-all')) {
        this.setChecked(this.allCheckboxes, trigger.checked);
    } else if (trigger.dataset.group) {
        this.handleGroup(trigger);
    } else {
        this.handleItem(trigger);
    }
};

DependentCheckboxes.prototype.setChecked = function(els, checked) {
    for (var i = 0, elsCount = els.length; i < elsCount; i++) {
        els[i].checked = checked;
    }
};

DependentCheckboxes.prototype.handleGroup = function(trigger) {
    var category = trigger.dataset.group;

    this.setChecked(this.container.querySelectorAll('input[data-category="' + category + '"]'), trigger.checked);
    this.checkGroups();
};

DependentCheckboxes.prototype.checkGroups = function() {
    var areAllGroupsChecked = true;

    for (var i = 0, groupsCount = this.allGroups.length; i < groupsCount; i++) {
        if (!this.allGroups[i].checked) {
            areAllGroupsChecked = false;
            break;
        }
    }

    this.checkAllCheckbox.checked = areAllGroupsChecked;
};

DependentCheckboxes.prototype.handleItem = function(trigger) {
    var category = trigger.dataset.category;

    this.checkCategory(category);
    this.checkGroups();
};

DependentCheckboxes.prototype.checkCategory = function(category) {
    var areAllInCategoryChecked = true;
    var categoryCheckboxes = this.container.querySelectorAll('[data-category="' + category + '"]');

    for (var i = 0, categoryCount = categoryCheckboxes.length; i < categoryCount; i++) {
        if (!categoryCheckboxes[i].checked) {
            areAllInCategoryChecked = false;
            break;
        }
    }

    document.querySelector('input[data-group="' + category + '"]').checked = areAllInCategoryChecked;
};
