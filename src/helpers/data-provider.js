import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

const CACHE_SECONDS = 86400;
const TOTAL_REGIONS = 2;

let dataDate = new Date();

let inspectionData = [];

const loadData = () => {
    let loadedData = [];
    let loadedRegions = [];

    getPeelInspections(data => {
        loadedData = loadedData.concat(data);

        loadedRegions.push('Peel');
        if (loadedRegions.length === TOTAL_REGIONS) {
            inspectionData = loadedData;
        }
    });

    getTorontoInspections(data => {
        loadedData = loadedData.concat(data);

        loadedRegions.push('Toronto');
        if (loadedRegions.length === TOTAL_REGIONS) {
            inspectionData = loadedData;
        }
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