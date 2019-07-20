import { parseString } from 'xml2js';
import xmlDownloader from '../helpers/xml-downloader';

const getTorontoInspections = (callback) => {
    xmlDownloader('http://opendata.toronto.ca/public.health/dinesafe/dinesafe.zip', (text) => {
        if (!text) {
            callback([]);
            return;
        }

        parseString(text, (err, result) => {
            if (err) {
                callback([]);
                return;
            }

            const inspections = {};
            result['ROWDATA']['ROW'].forEach(res => {
                let existingData = inspections[res['ESTABLISHMENT_ID'][0]];
                if (typeof existingData === 'undefined') {
                    existingData = {
                        'id': res['ESTABLISHMENT_ID'][0],
                        'name': res['ESTABLISHMENT_NAME'][0],
                        'type': res['ESTABLISHMENTTYPE'][0],
                        'address': res['ESTABLISHMENT_ADDRESS'][0],
                        'minInspections': res['MINIMUM_INSPECTIONS_PERYEAR'][0],
                        'coords': {
                            'latitude': res['LATITUDE'][0],
                            'longitude': res['LONGITUDE'][0]
                        },
                        'inspections': {
                        },
                        'dataSource': 'Toronto Public Health'
                    };
                }

                let inspectionData = existingData['inspections'][res['INSPECTION_ID'][0]];
                if (typeof inspectionData === 'undefined') {
                    inspectionData = {
                        'id': res['INSPECTION_ID'][0],
                        'inspectionDate': res['INSPECTION_DATE'][0],
                        'status': res['ESTABLISHMENT_STATUS'][0],
                        'inspectionType': 'N/A',
                        'infractions': []
                    }
                }

                const infractionDetails = res['INFRACTION_DETAILS'][0];
                if (infractionDetails !== '') {
                    inspectionData['infractions'].push({
                        'infractionDetails': infractionDetails,
                        'severity': res['SEVERITY'][0],
                        'action': res['ACTION'][0]
                    });
                }

                existingData['inspections'][res['INSPECTION_ID'][0]] = inspectionData;
                inspections[res['ESTABLISHMENT_ID'][0]] = existingData;
            });

            Object.keys(inspections).forEach(inspection => {
                inspections[inspection]['inspections'] = Object.values(inspections[inspection]['inspections']);
            });

            callback(Object.values(inspections));
        });
    });
};

const getPeelInspections = (callback) => {
    const getAddress = (newEntry) => {
        let address = newEntry['STREET_NUMBER'][0] + ' ' + newEntry['STREET_NAME'][0];

        const direction = newEntry['STREET_DIR'][0];
        if (direction !== ' ') {
            address = address + " " + direction;
        }

        address = address + ", " + newEntry['CITY'][0];
        return address;
    };

    const findMatch = (inspectionData, newEntry) => {
        const address = getAddress(newEntry);
        for (let i = 0; i < inspectionData.length; i++) {
            let value = inspectionData[i];
            if (value['address'] === address
                && value['name'] === newEntry['FACILITY_NAME'][0]) {
                    inspectionData.splice(i, 1);
                    return [inspectionData, value];
            }
        }

        return [inspectionData, undefined];
    };

    xmlDownloader('http://opendata.peelregion.ca/media/22752/foodcheckpeel.zip', (text) => {
        if (!text) {
            callback([]);
            return;
        }

        parseString(text, (err, result) => {
            if (err) {
                callback([]);
                return;
            }

            let inspections = [];
            result['ROWDATA']['ROW'].forEach(res => {
                let result = findMatch(inspections, res);

                let existingData = result[1];
                if (typeof existingData === 'undefined') {
                    existingData = {
                        'id': res['FACILITY_NUMBER'][0],
                        'name': res['FACILITY_NAME'][0],
                        'type': res['FACILITY_TYPE'][0],
                        'address': getAddress(res),
                        'minInspections': 'N/A',
                        'coords': {
                            'latitude': res['LAT'][0],
                            'longitude': res['LON'][0]
                        },
                        'inspections': {
                        },
                        'dataSource': 'Peel Public Health'
                    };
                } else {
                    inspections = result[0];
                }

                if (res['FACILITY_TYPE'][0] !== 'Healthy Menu Choices Act') {
                    existingData['type'] = res['FACILITY_TYPE'][0];
                    existingData['coords']['latitude'] = res['LAT'][0];
                    existingData['coords']['longitude'] = res['LON'][0];
                }

                let inspectionData = existingData['inspections'][res['INSPECTION_ID']];
                if (typeof inspectionData === 'undefined') {
                    inspectionData = {
                        'id': res['INSPECTION_ID'][0],
                        'inspectionDate': res['INSPECTION_DATE'][0],
                        'status': res['STATUS'][0],
                        'inspectionType': res['INSPECTION_TYPE'][0],
                        'infractions': []
                    }
                }

                const infractionDetails = res['INFRACTION_TYPE'][0];
                if (infractionDetails !== ' ') {
                    inspectionData['infractions'].push({
                        'infractionDetails': infractionDetails,
                        'severity': 'N/A',
                        'action': 'N/A'
                    });
                }

                existingData['inspections'][res['INSPECTION_ID'][0]] = inspectionData;
                inspections.push(existingData);
            });

            inspections.forEach(inspection => {
                inspection['inspections'] = Object.values(inspection['inspections']);
            });

            callback(inspections);
        });
    });
};

export { getPeelInspections, getTorontoInspections };