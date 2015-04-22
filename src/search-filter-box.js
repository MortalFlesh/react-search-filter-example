import React from 'react';
import * as store from './store';
import SearchFilter from './search-filter';
import state from './state';
import {reloadFilters as load} from './state';

load('./api/types.json', 'types');
load('./api/materials.json', 'materials');

const SearchFilterBox = React.createClass({
    componentDidMount() {
        state.on('change', () => {
            this.forceUpdate();
        });
    },

    handleSubmit() {
        console.log('form-submited');
    },

    render() {
        const types = store.getTypes().toJS();
        const selectedType = store.getSelectedType();

        const materials = store.getMaterials().toJS();
        const selectedMaterial = store.getSelectedMaterial();

        const style = {
            padding: 10,
            border: '1px solid black',
            borderRadius: 5,
        };

        return (
            <div className="SearchFilterBox" style={style}>
                <form onSubmit={this.handleSubmit}>
                    <SearchFilter name="type" options={types} selected={selectedType} onChange={this.handleSubmit} />

                    <SearchFilter name="material" options={materials} selected={selectedMaterial} onChange={this.handleSubmit} />
                </form>
            </div>
        );
    }
});

export default SearchFilterBox;
