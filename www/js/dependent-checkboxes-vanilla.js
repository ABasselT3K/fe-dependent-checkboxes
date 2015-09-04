var DependentCheckboxes = function(container) {
    this.container = container;
    this.checkboxes = this.container.getElementsByTagName('input');
    this.checkboxCheckAll = this.container.getElementsByClassName('check-all')[0];
    this.checkboxCheckGroup = this.container.querySelectorAll('input[data-group]');

    this.container.addEventListener('change', this.handleCheckboxChange.bind(this));
};

DependentCheckboxes.prototype.handleCheckboxChange = function(e) {
    var current = e.target;
    var checkAll = current.className === 'check-all';
    var group = current.getAttribute('data-group'); // dataset is slower than getAttribute - http://jsperf.com/dataset-vs-getattribute-and-setattribute/3
    var category = current.getAttribute('data-category');
    var isChecked = current.checked;

    if (checkAll) {
        this.handleClickCheckAll(isChecked);
    } else if (group) {
        this.handleClickCheckGroup(isChecked, group);
    } else {
        this.handleClickCheckCategory(category);
    }
};

DependentCheckboxes.prototype.handleClickCheckAll = function(bool) {
    var checkboxesLength = this.checkboxes.length;

    for (var i = 0; i < checkboxesLength; i++) {
        this.checkboxes[i].checked = bool;
    }
};

DependentCheckboxes.prototype.handleClickCheckGroup = function(bool, group) {
    var checkboxesInGroup = this.container.querySelectorAll('input[data-category="' + group + '"]');
    var checkboxesInGroupLength = checkboxesInGroup.length;

    for (var i = 0; i < checkboxesInGroupLength; i++) {
        checkboxesInGroup[i].checked = bool;
    }

    this.recountAllGroups();
};

DependentCheckboxes.prototype.handleClickCheckCategory = function(category) {
    var checkboxesInCategory = this.container.querySelectorAll('input[data-category="' + category + '"]');
    var checkboxesCategoryParent = this.container.querySelector('input[data-group="' + category + '"]');
    var allChecked = true;
    var checkboxesInCategoryLength = checkboxesInCategory.length;

    for (var i = 0; i < checkboxesInCategoryLength; i++) {
        if (!checkboxesInCategory[i].checked) {
            allChecked = false;
            break;
        }
    }

    checkboxesCategoryParent.checked = allChecked;

    this.recountAllGroups();
};

DependentCheckboxes.prototype.recountAllGroups = function() {
    var allGroupsChecked = true;
    var checkboxCheckGroupLength = this.checkboxCheckGroup.length;

    for (var i = 0; i < checkboxCheckGroupLength; i++) {
        if (!this.checkboxCheckGroup[i].checked) {
            allGroupsChecked = false;
            break;
        }
    }

    this.checkboxCheckAll.checked = allGroupsChecked;
};