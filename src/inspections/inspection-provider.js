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
                        }
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

            const inspections = {};
            result['ROWDATA']['ROW'].forEach(res => {
                let existingData = inspections[res['FACILITY_NUMBER'][0]];
                if (typeof existingData === 'undefined') {
                    let address = res['STREET_NUMBER'][0] + ' ' + res['STREET_NAME'][0];

                    const direction = res['STREET_DIR'][0];
                    if (direction !== ' ') {
                        address = address + " " + direction;
                    }

                    address = address + ", " + res['CITY'];

                    existingData = {
                        'id': res['FACILITY_NUMBER'][0],
                        'name': res['FACILITY_NAME'][0],
                        'type': res['FACILITY_TYPE'][0],
                        'address': address,
                        'minInspections': 'N/A',
                        'coords': {
                            'latitude': res['LAT'][0],
                            'longitude': res['LON'][0]
                        },
                        'inspections': {
                        }
                    };
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
                inspections[res['FACILITY_NUMBER'][0]] = existingData;
            });

            Object.keys(inspections).forEach(inspection => {
                inspections[inspection]['inspections'] = Object.values(inspections[inspection]['inspections']);
            });

            callback(Object.values(inspections));
        });
    });
};

export { getPeelInspections, getTorontoInspections };