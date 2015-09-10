(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
