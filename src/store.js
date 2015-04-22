import * as actions from './actions';
import {filtersCursor} from './state';
import dispatcher from './lib/dispatcher';
import {List, Record} from 'immutable';

const OptionRecord = new Record({
    id: 0,
    name: '',
});

export const dispatchToken = dispatcher.register(({action, data}) => {
    console.log('data:', data);

    switch (action) {
        case actions.setTypes:
            let types = new List();

            data.forEach((type) => {
                types = types.push(new OptionRecord(type).toMap());
            });

            filtersCursor((filters) => filters.set('types', types));
            break;

        case action.setSelectedType:
            filtersCursor((filters) => filters.set('selectedType', data));
            break;

        case actions.setMaterials:
            let materials = new List();

            data.forEach((material) => {
                materials = materials.push(new OptionRecord(material).toMap());
            });

            filtersCursor((filters) => filters.set('materials', materials));
            break;

        case action.setSelectedMaterial:
            filtersCursor((filters) => filters.set('selectedMaterial', data));
            break;
    }
});

export const getTypes = () => filtersCursor().get('types');
export const getSelectedType = () => filtersCursor().get('selectedType');

export const getMaterials = () => filtersCursor().get('materials');
export const getSelectedMaterial = () => filtersCursor().get('selectedMaterial');
