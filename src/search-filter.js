import React from 'react';

const SearchFilter = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        selected: React.PropTypes.number,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps() {
        return {
            selected: 0,
        };
    },

    handleChange(event) {
        this.props.onChange({
            name: this.props.name,
            value: event.target.value,
        });
    },

    render() {
        let opts = [{id: 0, name: '- all -'}];
        this.props.options.forEach((opt) => {
            opts.push(opt);
        });
        const options = opts.map((option, i) => <option key={i} value={option.id}>{option.name}</option>);

        return (
            <select
                className="SearchFilter"
                name={this.props.name}
                value={this.props.selected}
                onChange={this.handleChange}
            >
                {options}
            </select>
        );
    }
});

export default SearchFilter;
