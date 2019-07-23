import { getPeelInspections, getTorontoInspections } from '../inspections/inspection-provider';

let inspectionData = JSON.stringify([]);

const boot = () => {
    loadData();
    setInterval(loadData, 86400 * 1000);
};

const loadData = () => {
    const INSPECTION_PROVIDERS = [getPeelInspections, getTorontoInspections];

    let loadedData = [];
    let loadedRegions = 0;

    const addData = (data) => {
        loadedData = loadedData.concat(data);

        loadedRegions++;
        if (loadedRegions === INSPECTION_PROVIDERS.length) {
            inspectionData = JSON.stringify(loadedData);
        }
    };

    INSPECTION_PROVIDERS.forEach(provider => provider(data => addData(data)));
};

const getData = () => inspectionData;

export { boot, getData };