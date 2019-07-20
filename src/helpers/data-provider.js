import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

const INSPECTION_PROVIDERS = [getPeelInspections, getTorontoInspections];
const CACHE_SECONDS = 86400;

let dataDate;

let inspectionData = [];

const loadData = () => {
    dataDate = new Date();

    let loadedData = [];
    let loadedRegions = 0;

    const addData = (data) => {
        loadedData = loadedData.concat(data);

        loadedRegions++;
        if (loadedRegions === INSPECTION_PROVIDERS.length) {
            inspectionData = loadedData;
        }
    };

    INSPECTION_PROVIDERS.forEach(provider => provider(data => addData(data)));
};

const getData = () => {
    const currentDate = new Date();
    if ((currentDate - dataDate) / 1000 >= CACHE_SECONDS) {
        loadData();
    }

    return inspectionData;
};

export { loadData, getData };