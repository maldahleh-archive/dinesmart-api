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

            result['ROWDATA']['ROW'].forEach(res => {
                console.log(res);
            })
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

            result['ROWDATA']['ROW'].forEach(res => {
                console.log(res);
            })
        });
    });
};

export default (callback) => {
    const inspections = {};

    return inspections;
};