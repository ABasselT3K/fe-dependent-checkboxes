var DependentCheckboxes = function(container) {
    this.container = container;

    $(document)
        .on('change', ':checkbox.check-all', this.handleCheckAllChange.bind(this))
        .on('change', ':checkbox[data-group]', this.handleGroupLeaderChange.bind(this))
        // .on('change', ':checkbox[data-category]', this.handleGroupMemberChange.bind(this))
    ;
};

DependentCheckboxes.prototype = {

    handleCheckAllChange: function(e) {
        $(':checkbox').prop('checked', e.currentTarget.checked);
    },

    handleGroupLeaderChange: function(e) {
        var checkbox = e.currentTarget;
        $(':checkbox[data-category="'+ checkbox.getAttribute('data-group') +'"]').prop('checked', checkbox.checked);
    },

    // handleGroupMemberChange: function(e) {
    //     var siblings = $(e.currentTarget).closest('ul').find(':checkbox');
    // }

    // Todo sanitize group

    // Todo sanitize all
};
