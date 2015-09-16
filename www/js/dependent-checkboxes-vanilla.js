var DependentCheckboxes = function(container) {
    this.container = container;
    this.btnCheckAll = this.container.querySelector('.check-all');
    this.allCheckboxes = this.container.getElementsByTagName('input');
    this.allGroups = this.container.querySelectorAll('[data-group]');

    this.container.addEventListener('change', this.handleClickCheckbox.bind(this));
};

DependentCheckboxes.prototype.handleClickCheckbox = function(e) {
    var target = e.target;

    if (target.classList.contains('check-all')) {
        this.handleCheckAll(target);
    }

    else if (target.hasAttribute('data-group')) {
        this.handleCheckGroup(target);
    }
    else {
        this.handleCheckCategoryCheckboxes(target);
    }
};

DependentCheckboxes.prototype.handleCheckAll = function(checkbox) {
    var checkboxesLength = this.allCheckboxes.length;

    for (var i = 0; i < checkboxesLength; i++) {
        if (checkbox.checked) {
            this.allCheckboxes[i].checked = true;
        } else {
            this.allCheckboxes[i].checked = false;
        }
    }

};

DependentCheckboxes.prototype.handleCheckGroup = function(group) {
    var targetGroup = group.getAttribute('data-group');
    var groupChecked = group.checked;
    var groupCategory = this.container.querySelectorAll('input[data-category="' + targetGroup + '"]');

    for (var i = 0; i < groupCategory.length; i++) {
        if (groupChecked) {
            groupCategory[i].checked = true;
        } else {
            groupCategory[i].checked = false;
        }
    }

    this.checkGroupsCheckboxes();
};

DependentCheckboxes.prototype.checkGroupsCheckboxes = function() {
    this.btnCheckAll.checked = this.areCheckboxesChecked(this.allGroups);
};

DependentCheckboxes.prototype.handleCheckCategoryCheckboxes = function(category) {
    var targetCategory = category.getAttribute('data-category');
    var catChildren = this.container.querySelectorAll('input[data-category="' + targetCategory + '"]');
    var catParent = this.container.querySelector('input[data-group="' + targetCategory + '"]');

    catParent.checked = this.areCheckboxesChecked(catChildren);
    this.checkGroupsCheckboxes();
};

DependentCheckboxes.prototype.areCheckboxesChecked = function(checkboxes) {
    var checkboxesChecked = true;
    var checkboxesCount = checkboxes.length;

    for (var i = 0; i < checkboxesCount; i++) {
        if (!checkboxes[i].checked) {
            checkboxesChecked = false;
            break;
        }
    }

    return checkboxesChecked;
};
