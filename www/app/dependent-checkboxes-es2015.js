class DependentCheckboxes {
    constructor(container) {
        this.container = container;
        this.allCheckboxes = this.container.querySelectorAll('input[type="checkbox"]');
        this.allGroups = this.container.querySelectorAll('input[data-group]');
        this.checkAllCheckbox = this.container.querySelector('.check-all');

        this.container.addEventListener('change', this.handleCheck.bind(this), false);
    }

    handleCheck(e) {
        var trigger = e.target;

        if (trigger.classList.contains('check-all')) {
            this.setChecked(this.allCheckboxes, trigger.checked);
        } else if (trigger.dataset.group) {
            this.handleGroup(trigger);
        } else {
            this.handleItem(trigger);
        }
    }

    setChecked(els, checked) {
        // for (var i = 0; i < els.length; i++) {
        //     els[i].checked = checked;
        // }
        for (var el of els) {
            el.checked = checked;
        }
    }

    handleGroup(trigger) {
        var category = trigger.dataset.group;

        this.setChecked(this.container.querySelectorAll(`input[data-category="${category}"]`), trigger.checked);
        this.checkGroups();
    }

    checkGroups() {
        var areAllGroupsChecked = true;

        for (var group of this.allGroups) {
            if (!group.checked) {
                areAllGroupsChecked = false;
                break;
            }
        }

        this.checkAllCheckbox.checked = areAllGroupsChecked;
    }

    handleItem(trigger) {
        var category = trigger.dataset.category;

        this.checkCategory(category);
        this.checkGroups();
    }

    checkCategory(category) {
        var areAllInCategoryChecked = true;
        var categoryCheckboxes = this.container.querySelectorAll(`[data-category="${category}"]`);

        for (var checkbox of categoryCheckboxes) {
            if (!checkbox.checked) {
                areAllInCategoryChecked = false;
                break;
            }
        }

        document.querySelector(`input[data-group="${category}"]`).checked = areAllInCategoryChecked;
    }
}

window.DependentCheckboxes = DependentCheckboxes;
