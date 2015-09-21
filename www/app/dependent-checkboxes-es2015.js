class DependentCheckboxes {
	letructor(container) {
		this.container = container
		this.checkboxes = this.container.getElementsByTagName('input')
		this.checkboxCheckAll = this.container.getElementsByClassName('check-all')[0]

		this.container.addEventListener('change', this.handleChange.bind(this))
	}

	handleChange(e) {
		let current = e.target

		if (current === this.checkboxCheckAll) {
			this.handleCheckAll(current)
		} else {
			if (current.getAttribute('data-group')) {
				this.handleCheckGroup(current)
			} else {
				this.handleCheckGeneral(current)
			}
			this.areAllGroupsChecked()
		}
	}

	handleCheckAll(e) {
		let isChecked = e.checked
		let checkboxesTotal = this.checkboxes.length

		for (let i = checkboxesTotal - 1; i >= 0; i--) {
			this.checkboxes[i].checked = isChecked
		}
	}

	handleCheckGroup(e) {
		let isChecked = e.checked
		let group = e.getAttribute('data-group')
		let checkboxes = this.container.querySelectorAll('input[data-category="' + group + '"]')
		let checkboxesTotal = checkboxes.length

		for (let i = checkboxesTotal - 1; i >= 0; i--) {
			checkboxes[i].checked = isChecked
		}
	}

	handleCheckGeneral(e) {
		let category = e.getAttribute('data-category')

		this.areAllInCategoryChecked(category)
	}

	areAllInCategoryChecked(category) {
		let notCheckedExists = this.container.querySelector('input[data-category="' + category + '"]:not(:checked)')
		let checkboxParent = this.container.querySelector('input[data-group="' + category + '"]')
		let allChecked = notCheckedExists ? false : true

		checkboxParent.checked = allChecked
	}

	areAllGroupsChecked() {
		let notCheckedExists = this.container.querySelector('input[data-group]:not(:checked)')
		let allChecked = notCheckedExists ? false : true

		this.checkboxCheckAll.checked = allChecked
	}
}

window.DependentCheckboxes = DependentCheckboxes