const uploadLoginInput = document.getElementById('login_upload');
const uploadPasswordInput = document.getElementById('password_upload');
const downloadLoginInput = document.getElementById('login_download');
const downloadPasswordInput = document.getElementById('password_download');
const saveButton = document.getElementById('save_button');

const {uploadLogin, uploadPassword, downloadLogin, downloadPassword} = Lockr.get('credentials', {
    uploadLogin: '',
    uploadPassword: '',
    downloadLogin: '',
    downloadPassword: ''
});

uploadLoginInput.value = uploadLogin;
uploadPasswordInput.value = uploadPassword;
downloadLoginInput.value = downloadLogin;
downloadPasswordInput.value = downloadPassword;

saveButton.addEventListener('click', () => {
    Lockr.set('credentials', {
        uploadLogin: uploadLoginInput.value || '',
        uploadPassword: uploadPasswordInput.value || '',
        downloadLogin: downloadLoginInput.value || '',
        downloadPassword: downloadPasswordInput.value || ''
    });
});
