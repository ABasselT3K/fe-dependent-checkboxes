class DependentCheckboxes {
    constructor(container) {
        this.container = container;
        this.container.addEventListener('change', e => this.handleCheckboxChange(e.target));
    }

    handleCheckboxChange(checkbox) {
        if (checkbox.classList.contains('check-all')) {
            this.handleCheckAllChange(checkbox);
        } else if (checkbox.dataset.group) {
            this.handleCheckGroupChange(checkbox);
        }

        var allGroupsChecked = true;
        [...this.container.querySelectorAll('.column')].forEach(group => {
            const checkboxes = group.querySelectorAll('ul input[type="checkbox"]');
            for (var j = 0, allChecked = true; j < checkboxes.length; j++) {
                if (!checkboxes[j].checked) {
                    allGroupsChecked = allChecked = false;
                    break;
                }
            }

            this.setChecked(group.querySelectorAll('input[data-group]'), allChecked);
        });

        this.container.querySelector('input.check-all').checked = allGroupsChecked;
    }

    handleCheckAllChange(checkbox) {
        this.setChecked(this.container.querySelectorAll('input[type="checkbox"]'), checkbox.checked);
    };

    handleCheckGroupChange(checkbox) {
        this.setChecked(this.container.querySelectorAll(`input[data-category="${checkbox.dataset.group}"]`), checkbox.checked);
    };

    setChecked(checkboxes, checked) {
        [...checkboxes].forEach(checkbox => checkbox.checked = checked);
    }
}

window.DependentCheckboxes = DependentCheckboxes;
