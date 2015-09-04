var DependentCheckboxes = function(container) {
    this.container = $(container);
    this.checkboxes = this.container.find(':checkbox');
    this.btnCheckAll = this.container.find('.check-all');
    this.btnCheckCategory = this.container.find('[data-group]');

    this.container
        .on('change', '.check-all', $.proxy(this.handleClickCheckAll, this))
        .on('change', ':checkbox[data-group]', $.proxy(this.handleClickCheckCategory, this))
        .on('change', ':checkbox', $.proxy(this.handleClickCheckboxes, this));
};

DependentCheckboxes.prototype.handleClickCheckAll = function(e) {
    if ($(e.target).is(':checked')) {
        this.checkAll(true);
    } else {
        this.checkAll(false);
    }
};

DependentCheckboxes.prototype.checkAll = function(bool) {
    this.checkboxes.prop('checked', bool);
};

DependentCheckboxes.prototype.handleClickCheckCategory = function(e) {
    this.category = $(e.target).data('group');

    if ($(e.target).is(':checked')) {
        this.checkCategory(this.category, true);
    } else {
        this.checkCategory(this.category, false);
    }

    this.watchCategories();
};

DependentCheckboxes.prototype.checkCategory = function(category, bool) {
    this.checkboxes.filter('[data-category="' + category + '"]').prop('checked', bool);
};

DependentCheckboxes.prototype.watchCategories = function() {
    var categoriesTotal = this.btnCheckCategory.length;
    var categoriesChecked = this.btnCheckCategory.filter(':checked').length;

    if (categoriesChecked === categoriesTotal) {
        this.btnCheckAll.prop('checked', true);
    } else {
        this.btnCheckAll.prop('checked', false);
    }
};

DependentCheckboxes.prototype.handleClickCheckboxes = function(e) {
    this.category = $(e.target).data('category');

    var siblings = this.checkboxes.filter('[data-category="' + this.category + '"]');
    var siblingsTotal = siblings.length;
    var siblingsChecked = siblings.filter(':checked').length;

    if (siblingsChecked === siblingsTotal) {
        this.checkGroup(this.category, true);
    } else {
        this.checkGroup(this.category, false);
    }

    this.watchCategories();
};

DependentCheckboxes.prototype.checkGroup = function(category, bool) {
    this.btnCheckCategory.filter('[data-group="' + category + '"]').prop('checked', bool);
};