var DependentCheckboxes = function(container) {
    this.container = container;
    this.checkboxes = this.container.getElementsByTagName('input');//find('input[type="checkbox"]');
    this.checkgroup = this.container.querySelectorAll('[data-group]');
    this.checkmaster = this.container.getElementsByClassName('check-all');//return array of elements I need one object
    this.checkmaster = this.checkmaster[0];

    //this.checkmaster.addEventListener('change', this.CheckAll.bind(this)); //that sucks http://stackoverflow.com/questions/15485030/why-am-i-getting-typeerror-obj-addeventlistener-is-not-a-function
    this.container.addEventListener('change', this.handleWhateverHappens.bind(this));

    // this.checkmaster.on('click', $.proxy(this.CheckAll, this));
    // this.checkgroup.on('click', $.proxy(this.CheckGroup, this));
    // this.checkboxes.on('click', $.proxy(this.VerifiedGroup, this));
};
DependentCheckboxes.prototype.handleWhateverHappens = function(e) {
    var target = e.target; //event.target identifies the element on which the event occurred *** currentTarget refers to the element the event handler has been attached

    if (target.classList.contains('check-all')) {
        //console.log("master of all checkboxes");
        this.CheckAll();
    } else if (target.getAttribute('data-group')) {
        //console.log("master of group");
        this.CheckGroup(e);
    } else {
        //console.log("poor boring checkbox");
        this.VerifiedGroup(e);
    };
};

DependentCheckboxes.prototype.CheckAll = function(e) {
    var statusOfMaster = this.checkmaster.checked;
    var checkboxesLength = this.checkboxes.length;

    for (var i = 0 ; i < checkboxesLength; i++) {
        if (statusOfMaster) {
            this.checkboxes[i].checked = true;
        } else {
            this.checkboxes[i].checked = false;
        }
    };
};

DependentCheckboxes.prototype.CheckGroup = function(e) {
    //alert("yeeehaaa");
    var target = e.target;
    var statusOfGroup = target.checked;
    var group = target.getAttribute('data-group');
    var checkboxesInGroup = this.container.querySelectorAll('input[data-category="' + group + '"]');
    var checkboxesInGroupLength = checkboxesInGroup.length;

    for (var i = 0 ; i < checkboxesInGroupLength; i++) {
        if (statusOfGroup) {
            checkboxesInGroup[i].checked = true;
        } else {
            checkboxesInGroup[i].checked = false;
        }
    }

    this.VerifiedMaster();
};

DependentCheckboxes.prototype.VerifiedGroup = function(e) {
    var group = e.target.getAttribute('data-category');
    var allCheckboxiesInGroup = this.container.querySelectorAll('input[data-category="' + group + '"]');
    var counter = 0;

    for (var x = 0; x < allCheckboxiesInGroup.length; x++) {
        if (allCheckboxiesInGroup[x].checked) {
            counter++;
        }
    }

    if (counter === allCheckboxiesInGroup.length) {
        var help = this.container.querySelectorAll('input[data-group="' + group + '"]');
        help[0].checked = true;
    } else {
        var help = this.container.querySelectorAll('input[data-group="' + group + '"]');
        help[0].checked = false;
    }

    this.VerifiedMaster();
};

DependentCheckboxes.prototype.VerifiedMaster = function() {
    var counter = 0;
    var groupLength = this.checkgroup.length;

    for (var x = 0; x < groupLength; x++) {
        if (this.checkgroup[x].checked) {
            counter++;
        }
    }

    if (counter === groupLength) {
        this.checkmaster.checked = true;
    } else {
        this.checkmaster.checked = false;
    }
};
