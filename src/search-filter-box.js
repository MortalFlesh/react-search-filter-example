import React from 'react';
import * as store from './store';
import * as actions from './actions';
import SearchFilter from './search-filter';
import SearchFilterTitle from './search-filter-title';
import state from './state';
import {reloadFilters as load} from './state';
import Loading from './loading';

load('./api/types.json', 'types');
load('./api/materials.json', 'materials');

const SearchFilterBox = React.createClass({
    componentDidMount() {
        state.on('change', () => {
            this.forceUpdate();
        });
    },

    handleSubmit({name, value}) {
        switch(name) {
            case 'type':
                actions.setSelectedType(parseInt(value, 10));
                actions.setIsSearchingType(true);
                break;

            case 'material':
                actions.setSelectedMaterial(parseInt(value, 10));
                actions.setIsSearchingMaterial(true);
                break;
        }

        actions.performSearch();
    },

    render() {
        const types = store.getTypes().toJS();
        const selectedType = store.getSelectedType();

        const materials = store.getMaterials().toJS();
        const selectedMaterial = store.getSelectedMaterial();

        const isSearchingType = store.getIsSearchingType();
        const isSearchingMaterial = store.getIsSearchingMaterial();

        const style = {
            padding: 10,
            border: '1px solid black',
            borderRadius: 5,
        };

        return (
            <div className="SearchFilterBox" style={style}>
                <form onSubmit={this.handleSubmit}>
                    <SearchFilterTitle title="Typ:" isSearching={isSearchingType}>
                        <SearchFilter name="type" options={types} selected={selectedType} onChange={this.handleSubmit} />
                    </SearchFilterTitle>

                    <SearchFilterTitle title="Materiál:" isSearching={isSearchingMaterial}>
                        <SearchFilter name="material" options={materials} selected={selectedMaterial} onChange={this.handleSubmit} />
                    </SearchFilterTitle>
                </form>
            </div>
        );
    }
});

export default SearchFilterBox;
