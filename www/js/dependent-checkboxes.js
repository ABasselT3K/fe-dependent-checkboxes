var DependentCheckboxes = function(container) {
    this.container = $(container);
    this.checkboxes = this.container.find('input[type="checkbox"]');
    this.checkgroup = this.container.find('[data-group]');
    this.checkmaster = this.container.find('.check-all');

    this.checkmaster.on('click', $.proxy(this.CheckAll, this));
    this.checkgroup.on('click', $.proxy(this.CheckGroup, this));
    this.checkboxes.on('click', $.proxy(this.VerifiedGroup, this));
};

DependentCheckboxes.prototype.CheckAll = function(e) {
    var statusOfMaster = $(this.checkmaster).is(':checked');

    if (statusOfMaster) {
        this.checkboxes.prop('checked', true);
    } else {
       this.checkboxes.prop('checked', false);
    }
};

DependentCheckboxes.prototype.CheckGroup = function(e) {
    var statusOfGroup = $(e.target).is(':checked');
    var group = $(e.target).data('group');

    if (statusOfGroup) {
        this.container.find('[data-category="' + group + '"]').prop('checked', true);
    } else {
        this.container.find('[data-category="' + group + '"]').prop('checked', false);
    }

    this.VerifiedMaster();
};

DependentCheckboxes.prototype.VerifiedGroup = function(e) {
    var group = $(e.target).data('category');
    var allCheckboxiesInGroup = this.container.find('[data-category="' + group + '"]');
    var counter = 0;

    for (var x = 0; x < allCheckboxiesInGroup.length; x++) {
        if ($(allCheckboxiesInGroup[x]).is(':checked')) {
            counter++;
        }
    }

    if (counter === allCheckboxiesInGroup.length) {
        this.container.find('[data-group="' + group + '"]').prop('checked', true);
    } else {
        this.container.find('[data-group="' + group + '"]').prop('checked', false);
    }

    this.VerifiedMaster();
};

DependentCheckboxes.prototype.VerifiedMaster = function() {
    var counter = 0;

    for (var x = 0; x < this.checkgroup.length; x++) {
        if ($(this.checkgroup[x]).is(':checked')) {
            counter++;
        }
    }

    if (counter === this.checkgroup.length) {
        this.container.find('.check-all').prop('checked', true);
    } else {
        this.container.find('.check-all').prop('checked', false);
    }
};

/*function CheckAll(myObject) {
console.log("adfgalkdjgalkdflkfgh");
}*/


