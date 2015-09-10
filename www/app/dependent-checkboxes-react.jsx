import React from 'react';

class DependentCheckboxes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkAll: {
                checked: false
            },
            categories: [{
                items: [
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false},
                    {checked: false}
                ]
            }// ,
            // {
            //     items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            // },
            // {
            //     items: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            // }
            ]
        };
    }

    render() {
        return  <div>
                    <CheckAll checked={this.state.checkAll.checked} />
                    {this.state.categories.map((category, index) => {
                        return <Category index={index + 1} items={category.items} key={index + 1 + 'cat'} />
                    })}
                </div>;
    }
}

class CheckAll extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         checked: false
    //     };
    // }

    handleChange(e) {
        this.setState({
            checked: e.target.checked
        });
    }

    render() {
        return  <p>
                    <label className="checkbox">
                        <input type="checkbox" className="check-all" defaultChecked={this.props.checked} onChange={this.handleChange} /> Check all
                    </label>
                </p>;
    }
}

class Category extends React.Component {
    handleChange(index, e) {
        console.log(React.findDOMNode(this));
        var event = new CustomEvent('ITEM_CHANGE', { 'id': index });
    }

    render() {
        return  <div className="column">
                    <label className="checkbox">
                        <input type="checkbox" data-group={'cat' + this.props.index} />
                        Category {this.props.index}
                    </label>
                    <ul>{this.props.items.map((item, index) => {
                        return  <li key={this.props.index + '-' + index}>
                                    <label className="checkbox">
                                        <input type="checkbox" data-category={'cat' + this.props.index} onChange={this.handleChange.bind(this, index)} />
                                        Item
                                    </label>
                                </li>
                    })}</ul>
                </div>;
    }
}

React.render(<DependentCheckboxes />, document.getElementById('dependent-checkboxes-placeholder'));
