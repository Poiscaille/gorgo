
const {downloadLogin, downloadPassword} = Lockr.get('credentials', {
    downloadLogin: '',
    downloadPassword: ''
});

const username = downloadLogin;
const password = downloadPassword;
const webView = document.querySelector('webview');

if (username && password) {
    webView.addEventListener('dom-ready', () => {
        webView.loadURL('javascript:(function() { document.getElementById(\'username\').value = \'' + username + '\'; })()');
        webView.loadURL('javascript:(function() { document.getElementById(\'password\').value = \'' + password + '\'; })()');
        webView.loadURL('javascript:(function() { document.getElementsByClassName(\'btn-submit\')[0].click(); null;})()');
    });
}
