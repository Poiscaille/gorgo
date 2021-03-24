import {config} from './config.js';

function checkCsv(fileName, fileContent) {
    if (!/^(NDV|PEC|TRA)_\d{8}_\d{4}_.{5}\.(ric|csv)$/.test(fileName)) {
        return false;
    }
    return fileName.replace('.csv', '.ric');
}

export function upload(fileName, fileContent) {
    fileName = checkCsv(fileName, fileContent);
    if (!fileName)
        return Promise.reject(new Error('Nom de ficher incorrect'));
    
    if (!Lockr.get('credentials') || !Lockr.get('credentials').uploadLogin || !Lockr.get('credentials').uploadPassword) {
        alert('Identifiants manquants');
    }

    const login = Lockr.get('credentials').uploadLogin;
    const password = Lockr.get('credentials').uploadPassword;

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/xml');

    var raw = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:dep="http://depot_fichier.fam.fr/"><soap:Header/><soap:Body><dep:EnvoiTexte><login>${login}</login><password>${password}</password><typeApplication>2</typeApplication><param></param><nomFichier>${fileName}</nomFichier><buffer>${fileContent}</buffer></dep:EnvoiTexte></soap:Body></soap:Envelope>`; // eslint-disable-line max-len

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(config.remote.fam.url, requestOptions)
    .then(response => response.text())
    .catch(error => console.log('error', error));
}
