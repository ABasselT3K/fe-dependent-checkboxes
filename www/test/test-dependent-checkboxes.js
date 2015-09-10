var should = chai.should();

var container = $('#dependent-checkboxes');
var allCheckboxes = container.find(':checkbox');
var checkAll = container.find('.check-all');
var group1 = container.find('[data-group="cat1"]');
var group2 = container.find('[data-group="cat2"]');
var group3 = container.find('[data-group="cat3"]');
var category1 = container.find('[data-category="cat1"]');
var category2 = container.find('[data-category="cat2"]');
var category3 = container.find('[data-category="cat3"]');
var checkbox1Cat1 = container.find('[data-category="cat1"]:first');
var checkbox2Cat2 = container.find('[data-category="cat2"]:eq(1)');
var checkbox3Cat3 = container.find('[data-category="cat3"]:eq(2)');

describe('DependentCheckboxes:', function() {
    afterEach(function() {
        allCheckboxes.prop('checked', false);
    });

    describe('Class', function() {
        it('should be Object', function() {
            dependentCheckboxes.should.be.a('Object');
        });
    });

    describe('Check all checkbox:', function() {
        describe('If "check all" checkbox is checked all checkboxes', function() {
            it('should be checked', function() {
                checkAll.click();
                allCheckboxes.each(function() {
                    $(this).prop('checked').should.equal(true);
                });
            });
        });

        describe('If not all checkboxes are checked "check all" checkbox', function() {
            it('should be unchecked', function() {
                checkAll.click();
                checkbox1Cat1.click();
                checkAll.prop('checked').should.equal(false);
            });
        });

        describe('If all groups are checked "check all" checkbox', function() {
            it('should be checked', function() {
                group1.click();
                group2.click();
                group3.click();
                checkAll.prop('checked').should.equal(true);
            });
        });

        describe('If some group is unchecked "check all" checkbox', function() {
            it('should be unchecked', function() {
                checkAll.click();
                group2.click();
                checkAll.prop('checked').should.equal(false);
            });
        });
    });

    describe('Group checkboxes:', function() {
        describe('If group checkbox is checked all checkboxes in category', function() {
            it('should be checked', function() {
                group1.click();
                category1.each(function() {
                    $(this).prop('checked').should.equal(true);
                });
            });
        });

        describe('If not all checkboxes in category are checked group checkbox', function() {
            it('should be unchecked', function() {
                group2.click();
                checkbox2Cat2.click();
                group2.prop('checked').should.equal(false);
            });
        });

        describe('If all checkboxes in category are checked group checkbox', function() {
            it('should be checked', function() {
                category3.each(function() {
                    $(this).click();
                });
                group3.prop('checked').should.equal(true);
            });
        });

        describe('If some checkboxes in category are unchecked group checkbox', function() {
            it('should be unchecked', function() {
                category3.each(function() {
                    $(this).prop('checked', true);
                });
                checkbox3Cat3.prop('checked', false);
                group3.prop('checked').should.equal(false);
            });
        });
    })
});
