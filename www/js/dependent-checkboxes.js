var DependentCheckboxes = function(container) {
    this.container = $(container);

    this.container.on('click', '[data-category]', $.proxy(this.handleClickCategory, this));
    this.container.on('click', '[data-group]', $.proxy(this.handleClickGroup, this));
    this.container.on('click', '.check-all', $.proxy(this.handleClickAll, this));
};

DependentCheckboxes.prototype.handleClickCategory = function(e) {
    var cat = $(e.currentTarget).data('category');
    var itemsInCat = '[data-category=' + cat + ']';
    var parent = $('[data-group="' + cat + '"]');

    if (this.isCheckedAll(itemsInCat)) {
        parent.prop('checked', true);
    } else {
        parent.prop('checked', false);
    }

    this.checkAll();
};

DependentCheckboxes.prototype.handleClickGroup = function(e) {
    var cat = $(e.currentTarget).data('group');
    var itemsInCat = '[data-category=' + cat + ']';

    if (this.isCheckedAll(itemsInCat)) {
        $(itemsInCat).prop('checked', false);
    } else {
        $(itemsInCat).prop('checked', true);
    }

    this.checkAll();
};

DependentCheckboxes.prototype.handleClickAll = function() {
    var input = $('input');
    var groups = '[data-group]';

    if (this.isCheckedAll(groups)) {
        input.prop('checked', false);
    } else {
        input.prop('checked', true);
    }
};

DependentCheckboxes.prototype.checkAll = function() {
    var groups = '[data-group]';
    var all = $('.check-all');

    if (this.isCheckedAll(groups)) {
        all.prop('checked', true);
    } else {
        all.prop('checked', false);
    }
};

DependentCheckboxes.prototype.isCheckedAll = function(selector) {
    return $(selector).length === $(selector + ':checked').length;
};
