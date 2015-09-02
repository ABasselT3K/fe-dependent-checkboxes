var DependentCheckboxes = function(container) {
    this.container = container;
    this.btnCheckAll = this.container.find('.check-all');
    this.allCheckboxes = this.container.find(':checkbox');
    this.allGroups = this.allCheckboxes.filter('[data-group]');

    this.container
        .on('change', '.check-all', $.proxy(this.handleCheckAll, this))
        .on('change', ':checkbox[data-group]', $.proxy(this.handleCheckGroup, this))
        .on('change', ':checkbox', $.proxy(this.handleCheckCategoryCheckboxes, this));
};

DependentCheckboxes.prototype.handleCheckAll = function(e) {
    this.allCheckboxes.prop('checked', e.currentTarget.checked);
};

DependentCheckboxes.prototype.handleCheckGroup = function(e) {
    var category = $(e.currentTarget).data('group');

    this.allCheckboxes.filter('[data-category="' + category + '"]').prop('checked', e.currentTarget.checked);

    this.checkGroupsCheckboxes();
};

DependentCheckboxes.prototype.checkGroupsCheckboxes = function() {
    var isGroup = '[data-group]';

    if (this.areCheckboxesChecked(isGroup)) {
        this.btnCheckAll.prop('checked', true);
    } else {
        this.btnCheckAll.prop('checked', false);
    }
};

DependentCheckboxes.prototype.handleCheckCategoryCheckboxes = function(e) {
    var cat = $(e.currentTarget).data('category');
    var catChildren = '[data-category=' + cat + ']';
    var catParent = $('[data-group="' + cat + '"]');

    if (this.areCheckboxesChecked(catChildren)) {
        catParent.prop('checked', true);
    } else {
        catParent.prop('checked', false);
    }

    this.checkGroupsCheckboxes();

};

DependentCheckboxes.prototype.areCheckboxesChecked = function(selector) {
    return $(selector).length === $(selector + ':checked').length;
};
