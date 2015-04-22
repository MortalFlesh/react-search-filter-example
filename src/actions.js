import dispatcher from './lib/dispatcher';

export function setFilter(key: string, options: array) {
    if (key === 'types') {
        setTypes(options);
    } else if (key === 'materials') {
        setMaterials(options);
    }
}

export function setTypes(options: array) {
    dispatcher.dispatch(setTypes, options);
}

export function setSelectedType(type: number) {
    dispatcher.dispatch(setSelectedType, type);
}

export function setMaterials(options: array) {
    dispatcher.dispatch(setMaterials, options);
}

export function setSelectedMaterial(material: number) {
    dispatcher.dispatch(setSelectedMaterial, material);
}
