import * as actions from './actions';
import {filtersCursor} from './state';
import dispatcher from './lib/dispatcher';
import {List, Record} from 'immutable';

const OptionRecord = new Record({
    id: 0,
    name: '',
});

export const dispatchToken = dispatcher.register(({action, data}) => {
    switch (action) {
        case actions.setTypes:
            let types = new List();

            data.forEach((type) => {
                types = types.push(new OptionRecord(type).toMap());
            });

            filtersCursor((filters) => filters.set('types', types));
            break;

        case actions.setSelectedType:
            filtersCursor((filters) => filters.set('selectedType', data));
            break;

        case actions.setMaterials:
            let materials = new List();

            data.forEach((material) => {
                materials = materials.push(new OptionRecord(material).toMap());
            });

            filtersCursor((filters) => filters.set('materials', materials));
            break;

        case actions.setSelectedMaterial:
            filtersCursor((filters) => filters.set('selectedMaterial', data));
            break;

        case actions.setIsSearchingType:
            filtersCursor((filters) => filters.set('isSearchingType', data));
            break;

        case actions.setIsSearchingMaterial:
            filtersCursor((filters) => filters.set('isSearchingMaterial', data));
            break;

        case actions.performSearch:
            const selectedType = getSelectedType();
            const selectedMaterial = getSelectedMaterial();
            let searchUrl = [];

            if (selectedType) {
                searchUrl.push(`type=${selectedType}`);
            }
            if (selectedMaterial) {
                searchUrl.push(`material=${selectedMaterial}`);
            }

            setTimeout(() => {
                window.location.href = '/react/react-search-filter-example/index.php' + (searchUrl ? '?' + searchUrl.join('&') : '');
            }, 100);
            break;
    }
});

export function getTypes() {
    return filtersCursor().get('types');
}

export function getSelectedType() {
    return filtersCursor().get('selectedType');
}

export function getMaterials() {
    return filtersCursor().get('materials');
}

export function getSelectedMaterial() {
    return filtersCursor().get('selectedMaterial');
}

export function getIsSearchingType() {
    return filtersCursor().get('isSearchingType');
}

export function getIsSearchingMaterial() {
    return filtersCursor().get('isSearchingMaterial');
}
