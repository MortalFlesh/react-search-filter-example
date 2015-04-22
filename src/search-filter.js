import React from 'react';

const SearchFilter = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        selected: React.PropTypes.number,
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            selected: 0,
        };
    },

    handleChange() {
        this.props.onChange();
    },

    render() {
        const options = this.props.options.map((option, i) => <option key={i} value={option.id}>{option.name}</option>);

        return (
            <select
                className="SearchFilter"
                name={this.props.name}
                defaultValue={this.props.selected}
                onChange={this.handleChange}
            >
                {options}
            </select>
        );
    }
});

export default SearchFilter;
