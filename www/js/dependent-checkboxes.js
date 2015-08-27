var DependentCheckboxes = function(container) {
    this.container = $(container);
    this.allCheckboxes = this.container.find(':checkbox');
    this.allGroups = this.allCheckboxes.filter('[data-group]');
    this.checkAllCheckbox = this.container.find('.check-all');

    this.container.on('change', ':checkbox', $.proxy(this.handleCheck, this));
};

DependentCheckboxes.prototype.handleCheck = function(e) {
    var trigger = $(e.target);

    if (trigger.hasClass('check-all')) {
        this.allCheckboxes.prop('checked', trigger.prop('checked'));
    } else if (trigger.data('group')) {
        this.handleGroup(trigger);
    } else {
        this.handleItem(trigger);
    }
};

DependentCheckboxes.prototype.handleGroup = function(trigger) {
    var category = trigger.data('group');

    this.allCheckboxes.filter('[data-category="' + category + '"]').prop('checked', trigger.prop('checked'));

    this.checkGroups();
};

DependentCheckboxes.prototype.checkGroups = function() {
    var areAllGroupsChecked = true;

    this.allGroups.each(function() {
        if (!$(this).prop('checked')) {
            areAllGroupsChecked = false;
            return false;
        }
    });

    this.checkAllCheckbox.prop('checked', areAllGroupsChecked);
};

DependentCheckboxes.prototype.handleItem = function(trigger) {
    var category = trigger.data('category');

    this.checkCategory(category);
    this.checkGroups();
};

DependentCheckboxes.prototype.checkCategory = function(category) {
    var areAllInCategoryChecked = true;
    var categoryCheckboxes = this.allCheckboxes.filter('[data-category="' + category + '"]');

    categoryCheckboxes.each(function() {
        if (!$(this).prop('checked')) {
            areAllInCategoryChecked = false;
            return false;
        }
    });

    this.allCheckboxes.filter('[data-group="' + category + '"]').prop('checked', areAllInCategoryChecked);
};
