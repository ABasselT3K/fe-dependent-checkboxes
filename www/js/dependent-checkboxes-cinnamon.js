var DependentCheckboxes = function(container) {
    this.container = container;
    this.container.addEventListener('change', this.handleChange.bind(this));
};

DependentCheckboxes.prototype.handleChange = function(e) {
    var checkbox = e.target;

    if (checkbox.classList.contains('check-all')) {
        this.handleCheckAllChange(e);
    } else if (checkbox.getAttribute('data-group')) {
        this.handleCheckGroupChange(e);
    }

    this.handleCheckboxChange();
};

DependentCheckboxes.prototype.handleCheckAllChange = function(e) {
    this.setChecked('input[type="checkbox"]', e.target.checked);
};

DependentCheckboxes.prototype.handleCheckGroupChange = function(e) {
    var checkbox = e.target;
    this.setChecked('input[data-category="' + checkbox.getAttribute('data-group') + '"]', checkbox.checked);
};

DependentCheckboxes.prototype.handleCheckboxChange = function() {
    var allGroupsChecked = true;

    [].forEach.call(this.container.querySelectorAll('.column'), function(group) {
        var checkboxes = group.querySelectorAll('ul input[type="checkbox"]');
        var allChecked = true;

        for (var i = 0, count = checkboxes.length; i < count; i++) {
            if (!checkboxes[i].checked) {
                allGroupsChecked = allChecked = false;
                break;
            }
        }

        // todo refactor those freaky loops
        [].forEach.call(group.querySelectorAll('input[data-group]'), function(el) {
            el.checked = allChecked;
        });
    });

    this.container.querySelector('input.check-all').checked = allGroupsChecked;
};

// Bad practice?
DependentCheckboxes.prototype.setChecked = function(selector, checked) {
    [].forEach.call(document.querySelectorAll(selector), function(el) {
        el.checked = checked;
    });
};
