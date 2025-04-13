var titleIndex = 0;
var titleString = '';
var switchType = -1;
var titleBase = '<<>> | CIƬYPvP.DΣ | <<>>';

function switchTitle() {
    var currentChar = titleBase.charAt(titleIndex);
    if (titleBase.length === titleIndex) {
        titleIndex = 0;
        titleString = '';
    }

    switchType++;
    if (switchType == 0) {
        titleString = titleString.concat('-');
    } else if (switchType == 1) {
        titleString = titleString.substring(0, titleString.length - 1).concat('+');
    } else if (switchType == 2) {
        titleString = titleString.substring(0, titleString.length - 1).concat('|');
    } else if (switchType == 3) {
        titleString = titleString.substring(0, titleString.length - 1).concat('/');
    } else if (switchType == 4) {
        titleString = titleString.substring(0, titleString.length - 1).concat('-');
    } else if (switchType == 5) {
        titleString = titleString.substring(0, titleString.length - 1).concat('+');
    } else if (switchType == 6) {
        titleString = titleString.substring(0, titleString.length - 1).concat('|');
    } else if (switchType == 7) {
        titleString = titleString.substring(0, titleString.length - 1).concat(currentChar);
        titleIndex++;
        switchType = -1;
    }

    document.title = titleString;
    setTimeout(switchTitle, 80);
}

switchTitle();
