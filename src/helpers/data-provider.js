import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

let cacheSeconds = 86400;
let dataDate = new Date();

let inspectionData = {
    'peel': {},
    'toronto': {}
};

const loadData = () => {
    getPeelInspections(data => {
        inspectionData['peel'] = data;
    });

    getTorontoInspections(data => {
        inspectionData['toronto'] = data;
    });
};

const getData = () => {
    const currentDate = new Date();
    if ((currentDate - dataDate) / 1000 >= cacheSeconds) {
        dataDate = currentDate;
        loadData();
    }

    return inspectionData;
};

export { loadData, getData };