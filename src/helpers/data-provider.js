import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

const CACHE_SECONDS = 86400;
let dataDate = new Date();

let inspectionData = [];

const loadData = () => {
    inspectionData = [];
    getPeelInspections(data => {
        inspectionData = inspectionData.concat(data);
    });

    getTorontoInspections(data => {
        inspectionData = inspectionData.concat(data);
    });
};

const getData = () => {
    const currentDate = new Date();
    if ((currentDate - dataDate) / 1000 >= CACHE_SECONDS) {
        dataDate = currentDate;
        loadData();
    }

    return inspectionData;
};

export { loadData, getData };