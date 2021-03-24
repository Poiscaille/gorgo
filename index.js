import {upload} from './soap.js';

const dropZone = document.getElementById('drop_zone');
const fileNameInput = document.getElementById('filename_input');
const uploadButton = document.getElementById('upload_button');
const uploadFileInput = document.getElementById('file_input');
let uploadFileContent;

function allowUpload(fileName, fileContent) {
    uploadFileContent = fileContent;
    fileNameInput.value = fileName;
    activateUploadButton();
}

function uploadFile() {
    uploadButton.classList.add('is-loading');
    upload(fileNameInput.value.trim(), uploadFileContent)
    .then(() => {
        uploadButton.classList.remove('is-loading');
        alert('fichier envoyé avec succès'); // eslint-disable-line no-alert
    })
    .catch(err => {
        uploadButton.classList.remove('is-loading');
        alert(err); // eslint-disable-line no-alert
    });
}

function dropHandler(ev) {
    let fileName = '';
    const fr = new FileReader();
    fr.addEventListener('load', () => {
        allowUpload(fileName, fr.result);
    });
  
    if (ev.dataTransfer.items) {
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
                const file = ev.dataTransfer.items[i].getAsFile();
                fileName = file.name.replace('.csv', '.ric');
                fr.readAsText(file);
            }
        }
    } else {
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            fileName = ev.dataTransfer.files[i].name.replace('.csv', '.ric');
            fr.readAsText(ev.dataTransfer.files[i]);
        }
    }
}

function checkFiles() {
    var file = uploadFileInput.files[0];
    if (file) {
        var fr = new FileReader();
        fr.readAsText(file, 'UTF-8');
        fr.addEventListener('load', () => {
            allowUpload(file.name, fr.result);
        });
    }
}

function preventDefaults(ev) {
    ev.preventDefault();
    ev.stopPropagation();
}

function highlight() {
    dropZone.classList.add('is-dragged');
}

function unHighlight() {
    dropZone.classList.remove('is-dragged');
}

function activateUploadButton() {
    uploadButton.classList.remove('is-static');
}

function deactivateUploadButton() {
    uploadButton.classList.add('is-static');
}

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
})
  
;['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unHighlight, false);
});
  
dropZone.addEventListener('drop', dropHandler);
uploadButton.addEventListener('click', uploadFile);
uploadFileInput.addEventListener('change', checkFiles);
