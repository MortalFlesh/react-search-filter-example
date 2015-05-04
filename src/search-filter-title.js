import React from 'react';
import {addons} from 'react/addons';
import Loading from './loading';

const SearchFilterTitle = React.createClass({
    mixins: [addons.PureRenderMixin],

    propTypes: {
        title: React.PropTypes.string.isRequired,
        isSearching: React.PropTypes.bool.isRequired,
        children: React.PropTypes.element.isRequired,
    },

    render() {
        const style = {
            display: 'block',
            padding: 5,
            borderBottom: '1px solid black',
            marginBottom: 5,
        };

        return (
            <label className="SearchFilterTitle" style={style}>
                <strong>{this.props.title}</strong>

                {this.props.isSearching &&
                    <Loading/>
                }

                <br/>

                {this.props.children}
            </label>
        );
    }
});

export default SearchFilterTitle;
