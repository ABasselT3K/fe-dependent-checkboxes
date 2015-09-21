(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DependentCheckboxes = (function () {
	function DependentCheckboxes() {
		_classCallCheck(this, DependentCheckboxes);
	}

	_createClass(DependentCheckboxes, [{
		key: 'letructor',
		value: function letructor(container) {
			this.container = container;
			this.checkboxes = this.container.getElementsByTagName('input');
			this.checkboxCheckAll = this.container.getElementsByClassName('check-all')[0];

			this.container.addEventListener('change', this.handleChange.bind(this));
		}
	}, {
		key: 'handleChange',
		value: function handleChange(e) {
			var current = e.target;

			if (current === this.checkboxCheckAll) {
				this.handleCheckAll(current);
			} else {
				if (current.getAttribute('data-group')) {
					this.handleCheckGroup(current);
				} else {
					this.handleCheckGeneral(current);
				}
				this.areAllGroupsChecked();
			}
		}
	}, {
		key: 'handleCheckAll',
		value: function handleCheckAll(e) {
			var isChecked = e.checked;
			var checkboxesTotal = this.checkboxes.length;

			for (var i = checkboxesTotal - 1; i >= 0; i--) {
				this.checkboxes[i].checked = isChecked;
			}
		}
	}, {
		key: 'handleCheckGroup',
		value: function handleCheckGroup(e) {
			var isChecked = e.checked;
			var group = e.getAttribute('data-group');
			var checkboxes = this.container.querySelectorAll('input[data-category="' + group + '"]');
			var checkboxesTotal = checkboxes.length;

			for (var i = checkboxesTotal - 1; i >= 0; i--) {
				checkboxes[i].checked = isChecked;
			}
		}
	}, {
		key: 'handleCheckGeneral',
		value: function handleCheckGeneral(e) {
			var category = e.getAttribute('data-category');

			this.areAllInCategoryChecked(category);
		}
	}, {
		key: 'areAllInCategoryChecked',
		value: function areAllInCategoryChecked(category) {
			var notCheckedExists = this.container.querySelector('input[data-category="' + category + '"]:not(:checked)');
			var checkboxParent = this.container.querySelector('input[data-group="' + category + '"]');
			var allChecked = notCheckedExists ? false : true;

			checkboxParent.checked = allChecked;
		}
	}, {
		key: 'areAllGroupsChecked',
		value: function areAllGroupsChecked() {
			var notCheckedExists = this.container.querySelector('input[data-group]:not(:checked)');
			var allChecked = notCheckedExists ? false : true;

			this.checkboxCheckAll.checked = allChecked;
		}
	}]);

	return DependentCheckboxes;
})();

window.DependentCheckboxes = DependentCheckboxes;

},{}]},{},[1]);
