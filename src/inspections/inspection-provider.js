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
                let existingData = inspections[res['ESTABLISHMENT_ID']];
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

                let inspectionData = existingData['inspections'][res['INSPECTION_ID']];
                if (typeof inspectionData === 'undefined') {
                    inspectionData = {
                        'id': res['INSPECTION_ID'][0],
                        'inspectionDate': res['INSPECTION_DATE'][0],
                        'status': res['ESTABLISHMENT_STATUS'][0],
                        'infractions': []
                    }
                }

                inspectionData['infractions'].push({
                    'infractionDetails': res['INFRACTION_DETAILS'][0],
                    'severity': res['SEVERITY'][0],
                    'action': res['ACTION'][0]
                });

                existingData['inspections'][res['INSPECTION_ID']] = inspectionData;
                inspections[res['ESTABLISHMENT_ID']] = existingData;
            });

            callback(inspections);
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


        });
    });
};

export default (callback) => {
    const inspections = {};
    getTorontoInspections(callback);

    return inspections;
};