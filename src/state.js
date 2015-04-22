import Immutable from 'immutable';
import State from './lib/state';
import Loader from './lib/loader';
import * as action from './actions';

const basicData = Immutable.fromJS({
    filters: {
        types: [],
        selectedType: 0,
        materials: [],
        selectedMaterial: 0,
    }
});

const appState = new State(basicData);

export default appState;
export const state = appState;

export const filtersCursor = appState.cursor(['filters']);

export const reloadFilters = (url, key) => {
    Loader.loadJson(url, (response) => {
        if (response.hasOwnProperty(key)) {
            action.setFilter(key, response[key]);
        }
    });
};