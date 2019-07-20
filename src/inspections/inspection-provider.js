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
                        'name': res['ESTABLISHMENT_NAME'][0].trim(),
                        'type': res['ESTABLISHMENTTYPE'][0],
                        'address': res['ESTABLISHMENT_ADDRESS'][0].trim(),
                        'coords': {
                            'lat': res['LATITUDE'][0],
                            'lon': res['LONGITUDE'][0]
                        },
                        'inspections': {
                        }
                    };
                }

                let inspectionData = existingData['inspections'][res['INSPECTION_ID'][0]];
                if (typeof inspectionData === 'undefined') {
                    inspectionData = {
                        'date': res['INSPECTION_DATE'][0],
                        'status': res['ESTABLISHMENT_STATUS'][0],
                        'infractions': []
                    }
                }

                const infractionDetails = res['INFRACTION_DETAILS'][0];
                if (infractionDetails !== '') {
                    inspectionData['infractions'].push({
                        'details': infractionDetails,
                        'severity': res['SEVERITY'][0]
                    });
                }

                existingData['inspections'][res['INSPECTION_ID'][0]] = inspectionData;
                inspections[res['ESTABLISHMENT_ID'][0]] = existingData;
            });

            Object.keys(inspections).forEach(inspection => {
                let inspectionArray = Object.values(inspections[inspection]['inspections']);
                inspectionArray.sort((a, b) => (b['date'] > a['date']) ? 1
                    : ((a['date'] > b['date']) ? -1 : 0));

                inspections[inspection]['inspections'] = inspectionArray;
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
                        'name': res['FACILITY_NAME'][0],
                        'type': res['FACILITY_TYPE'][0],
                        'address': getAddress(res),
                        'coords': {
                            'lat': res['LAT'][0],
                            'lon': res['LON'][0]
                        },
                        'inspections': {
                        }
                    };
                } else {
                    inspections = result[0];
                }

                if (res['FACILITY_TYPE'][0] !== 'Healthy Menu Choices Act') {
                    existingData['type'] = res['FACILITY_TYPE'][0];
                    existingData['coords']['lat'] = res['LAT'][0];
                    existingData['coords']['lon'] = res['LON'][0];
                }

                let inspectionData = existingData['inspections'][res['INSPECTION_ID']];
                if (typeof inspectionData === 'undefined') {
                    inspectionData = {
                        'date': res['INSPECTION_DATE'][0],
                        'status': res['STATUS'][0],
                        'infractions': []
                    }
                }

                let infractionDetails = res['INFRACTION_TYPE'][0];
                if (infractionDetails !== ' ') {
                    let severity = 'NA - Not Applicable';
                    if (infractionDetails.toLowerCase().endsWith('(significant risk)')) {
                        infractionDetails = infractionDetails.substring(0, infractionDetails.length - 19);
                        severity = 'S - Significant';
                    } else if (infractionDetails.toLowerCase().endsWith('(critical risk)')) {
                        infractionDetails = infractionDetails.substring(0, infractionDetails.length - 16);
                        severity = 'C - Critical'
                    }

                    inspectionData['infractions'].push({
                        'details': infractionDetails,
                        'severity': severity
                    });
                }

                existingData['inspections'][res['INSPECTION_ID'][0]] = inspectionData;
                inspections.push(existingData);
            });

            inspections.forEach(inspection => {
                let inspectionArray = Object.values(inspection['inspections']);
                inspectionArray.sort((a, b) => (b['date'] > a['date']) ? 1
                    : ((a['date'] > b['date']) ? -1 : 0));

                inspection['inspections'] = inspectionArray;
            });

            callback(inspections);
        });
    });
};

export { getPeelInspections, getTorontoInspections };