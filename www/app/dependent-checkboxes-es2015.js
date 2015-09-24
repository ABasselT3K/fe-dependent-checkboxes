class DependentCheckboxes {

    constructor(container) {
        this.container = container;
        this.btnCheckAll = this.container.querySelector('.check-all');
        this.allCheckboxes = this.container.getElementsByTagName('input');
        this.allGroups = this.container.querySelectorAll('[data-group]');

        this.container.addEventListener('change', e => {
            let target = e.target;

            if (target.classList.contains('check-all')) {
                this.handleCheckAll(target);
            }

            else if (target.hasAttribute('data-group')) {
                this.handleCheckGroup(target);
            }

            else {
                this.handleCheckCategoryCheckboxes(target);
            }
        });
    }

    handleCheckAll(checkbox) {
        let checkboxesLength = this.allCheckboxes.length;

        for (let i = 0; i < checkboxesLength; i++) {
            if (checkbox.checked) {
                this.allCheckboxes[i].checked = true;
            } else {
                this.allCheckboxes[i].checked = false;
            }
        }

    }

    handleCheckGroup(group) {
        let targetGroup = group.getAttribute('data-group');
        let groupChecked = group.checked;
        let groupCategory = this.container.querySelectorAll('input[data-category="' + targetGroup + '"]');

        for (let i = 0; i < groupCategory.length; i++) {
            if (groupChecked) {
                groupCategory[i].checked = true;
            } else {
                groupCategory[i].checked = false;
            }
        }

        this.checkGroupsCheckboxes();
    }

    checkGroupsCheckboxes() {
        this.btnCheckAll.checked = this.areCheckboxesChecked(this.allGroups);
    }

    handleCheckCategoryCheckboxes(category) {
        let targetCategory = category.getAttribute('data-category');
        let catChildren = this.container.querySelectorAll('input[data-category="' + targetCategory + '"]');
        let catParent = this.container.querySelector('input[data-group="' + targetCategory + '"]');

        catParent.checked = this.areCheckboxesChecked(catChildren);
        this.checkGroupsCheckboxes();
    }

    areCheckboxesChecked(checkboxes) {
        let checkboxesChecked = true;
        let checkboxesCount = checkboxes.length;

        for (let i = 0; i < checkboxesCount; i++) {
            if (!checkboxes[i].checked) {
                checkboxesChecked = false;
                break;
            }
        }

        return checkboxesChecked;
    }

}

window.DependentCheckboxes = DependentCheckboxes;
