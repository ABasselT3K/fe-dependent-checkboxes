(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DependentCheckboxes = (function () {
    function DependentCheckboxes(container) {
        var _this = this;

        _classCallCheck(this, DependentCheckboxes);

        this.container = container;
        this.container.addEventListener('change', function (e) {
            return _this.handleCheckboxChange(e.target);
        });
    }

    _createClass(DependentCheckboxes, [{
        key: 'handleCheckboxChange',
        value: function handleCheckboxChange(checkbox) {
            var _this2 = this;

            if (checkbox.classList.contains('check-all')) {
                this.handleCheckAllChange(checkbox);
            } else if (checkbox.dataset.group) {
                this.handleCheckGroupChange(checkbox);
            }

            var allGroupsChecked = true;
            [].concat(_toConsumableArray(this.container.querySelectorAll('.column'))).forEach(function (group) {
                var checkboxes = group.querySelectorAll('ul input[type="checkbox"]');
                for (var j = 0, allChecked = true; j < checkboxes.length; j++) {
                    if (!checkboxes[j].checked) {
                        allGroupsChecked = allChecked = false;
                        break;
                    }
                }

                _this2.setChecked(group.querySelectorAll('input[data-group]'), allChecked);
            });

            this.container.querySelector('input.check-all').checked = allGroupsChecked;
        }
    }, {
        key: 'handleCheckAllChange',
        value: function handleCheckAllChange(checkbox) {
            this.setChecked(this.container.querySelectorAll('input[type="checkbox"]'), checkbox.checked);
        }
    }, {
        key: 'handleCheckGroupChange',
        value: function handleCheckGroupChange(checkbox) {
            this.setChecked(this.container.querySelectorAll('input[data-category="' + checkbox.dataset.group + '"]'), checkbox.checked);
        }
    }, {
        key: 'setChecked',
        value: function setChecked(checkboxes, checked) {
            [].concat(_toConsumableArray(checkboxes)).forEach(function (checkbox) {
                return checkbox.checked = checked;
            });
        }
    }]);

    return DependentCheckboxes;
})();

window.DependentCheckboxes = DependentCheckboxes;

},{}]},{},[1]);
