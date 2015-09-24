(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DependentCheckboxes = (function () {
    function DependentCheckboxes(container) {
        var _this = this;

        _classCallCheck(this, DependentCheckboxes);

        this.container = container;
        this.btnCheckAll = this.container.querySelector('.check-all');
        this.allCheckboxes = this.container.getElementsByTagName('input');
        this.allGroups = this.container.querySelectorAll('[data-group]');

        this.container.addEventListener('change', function (e) {
            var target = e.target;

            if (target.classList.contains('check-all')) {
                _this.handleCheckAll(target);
            } else if (target.hasAttribute('data-group')) {
                _this.handleCheckGroup(target);
            } else {
                _this.handleCheckCategoryCheckboxes(target);
            }
        });
    }

    _createClass(DependentCheckboxes, [{
        key: 'handleCheckAll',
        value: function handleCheckAll(checkbox) {
            var checkboxesLength = this.allCheckboxes.length;

            for (var i = 0; i < checkboxesLength; i++) {
                if (checkbox.checked) {
                    this.allCheckboxes[i].checked = true;
                } else {
                    this.allCheckboxes[i].checked = false;
                }
            }
        }
    }, {
        key: 'handleCheckGroup',
        value: function handleCheckGroup(group) {
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
        }
    }, {
        key: 'checkGroupsCheckboxes',
        value: function checkGroupsCheckboxes() {
            this.btnCheckAll.checked = this.areCheckboxesChecked(this.allGroups);
        }
    }, {
        key: 'handleCheckCategoryCheckboxes',
        value: function handleCheckCategoryCheckboxes(category) {
            var targetCategory = category.getAttribute('data-category');
            var catChildren = this.container.querySelectorAll('input[data-category="' + targetCategory + '"]');
            var catParent = this.container.querySelector('input[data-group="' + targetCategory + '"]');

            catParent.checked = this.areCheckboxesChecked(catChildren);
            this.checkGroupsCheckboxes();
        }
    }, {
        key: 'areCheckboxesChecked',
        value: function areCheckboxesChecked(checkboxes) {
            var checkboxesChecked = true;
            var checkboxesCount = checkboxes.length;

            for (var i = 0; i < checkboxesCount; i++) {
                if (!checkboxes[i].checked) {
                    checkboxesChecked = false;
                    break;
                }
            }

            return checkboxesChecked;
        }
    }]);

    return DependentCheckboxes;
})();

window.DependentCheckboxes = DependentCheckboxes;

},{}]},{},[1]);
