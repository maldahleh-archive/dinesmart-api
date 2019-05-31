import admZip from 'adm-zip';
import request from 'request';

export default (url, completion) => {
    request.get({url: url, encoding: null}, (err, res, body) => {
        if (err) {
            completion(null);
            return;
        }

        const zip = new admZip(body);
        const file = zip.getEntries().find(entry => entry.entryName.toLowerCase().endsWith('.xml'));
        if (!file) {
            completion(null);
            return;
        }

        completion(zip.readAsText(file, 'utf-8'));
    });
}