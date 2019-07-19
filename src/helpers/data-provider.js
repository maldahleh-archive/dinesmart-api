import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

const CACHE_SECONDS = 86400;
const TOTAL_REGIONS = 2;

let dataDate = new Date();

let inspectionData = [];

const loadData = () => {
    let loadedData = [];
    let loadedRegions = 0;

    const addData = (data) => {
        loadedData = loadedData.concat(data);

        loadedRegions++;
        if (loadedRegions === TOTAL_REGIONS) {
            inspectionData = loadedData;
        }
    };

    getPeelInspections(data => addData(data));
    getTorontoInspections(data => addData(data));
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