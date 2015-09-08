/**
 * @param {HTMLElement} container
 */
var DependentCheckboxes = function(container) {
    this.container = container;
    this.checkboxCheckAll = this.container.querySelector('input.check-all');

    this.container.addEventListener('change', this.handleChange.bind(this));
};

/**
 * @param {Event} e
 */
DependentCheckboxes.prototype.handleChange = function(e) {
    var checkbox = e.target;

    if (checkbox.classList.contains('check-all')) {
        this.handleCheckAllChange(checkbox);
    } else if (checkbox.getAttribute('data-group')) {
        this.handleCheckGroupChange(checkbox);
    }

    this.handleCheckboxChange();
};

/**
 * @param {HTMLInputElement} checkbox
 */
DependentCheckboxes.prototype.handleCheckAllChange = function(checkbox) {
    this.setChecked(this.container.querySelectorAll('input[type="checkbox"]'), checkbox.checked);
};

/**
 * @param {HTMLInputElement} checkbox
 */
DependentCheckboxes.prototype.handleCheckGroupChange = function(checkbox) {
    this.setChecked(this.container.querySelectorAll('input[data-category="' + checkbox.getAttribute('data-group') + '"]'), checkbox.checked);
};

DependentCheckboxes.prototype.handleCheckboxChange = function() {
    var groups = this.container.querySelectorAll('.column');
    var allGroupsChecked = true;

    for (var i = 0; i < groups.length; i++) {
        var checkboxes = groups[i].querySelectorAll('ul input[type="checkbox"]');
        var allChecked = true;

        for (var j = 0; j < checkboxes.length; j++) {
            if (!checkboxes[j].checked) {
                allGroupsChecked = allChecked = false;
                break;
            }
        }

        this.setChecked(groups[i].querySelectorAll('input[data-group]'), allChecked);
    }

    this.checkboxCheckAll.checked = allGroupsChecked;
};

/**
 * @param {NodeList} checkbox
 * @param {boolean} checked
 */
DependentCheckboxes.prototype.setChecked = function(checkboxes, checked) {
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = checked;
    }
};
