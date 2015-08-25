var DependentCheckboxes = function(container) {
    this.container = container;

    this.container
        .on('change', ':checkbox.check-all', this.handleCheckAllChange.bind(this))
        .on('change', ':checkbox[data-group]', this.handleCheckGroupChange.bind(this))
        .on('change', ':checkbox', this.handleCheckboxChange.bind(this));
};

DependentCheckboxes.prototype.handleCheckAllChange = function(e) {
    $(':checkbox').prop('checked', e.currentTarget.checked);
};

DependentCheckboxes.prototype.handleCheckGroupChange = function(e) {
    var checkbox = e.currentTarget;
    $(':checkbox[data-category="'+ checkbox.getAttribute('data-group') +'"]').prop('checked', checkbox.checked);
};

DependentCheckboxes.prototype.handleCheckboxChange = function() {
    'use strict';

    var groups = this.container.find('.column');
    var allGroupsChecked = true;

    for (let i = 0; i < groups.length; i++) {
        let group = $(groups[i]);
        let checkboxes = group.find('ul :checkbox');
        let allChecked = true;

        for (let i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                allGroupsChecked = allChecked = false;
                break;
            }
        }

        group.find(':checkbox[data-group]').prop('checked', allChecked);
    }

    this.container.find(':checkbox.check-all').prop('checked', allGroupsChecked);
};
