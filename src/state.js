import Immutable from 'immutable';
import State from './lib/state';
import Loader from './lib/loader';
import * as actions from './actions';

const urlParts = window.location.href.split('?');
let selectedType = 0;
let selectedMaterial = 0;

if (urlParts.length > 1) {
    const paramParts = urlParts[1].split('&');
    paramParts.forEach((paramPart) => {
        const param = paramPart.split('=');
        const name = String(param[0]);
        const value = parseInt(param[1], 10);

        if (name === 'type') {
            selectedType = value;
        } else if (name === 'material') {
            selectedMaterial = value;
        }
    });
}

const basicData = Immutable.fromJS({
    filters: {
        selectedType,
        selectedMaterial,
        types: [],
        materials: [],
        isSearchingType: false,
        isSearchingMaterial: false,
    }
});

const appState = new State(basicData);

export default appState;
export const state = appState;

export const filtersCursor = appState.cursor(['filters']);

export const reloadFilters = (url, key) => {
    Loader.loadJson(url, (response) => {
        if (response.hasOwnProperty(key)) {
            actions.setFilter(key, response[key]);
        }
    });
};
