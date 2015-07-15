var script = function() {
    var flashStatus;
    var isActive;
    chrome.tabs.query(
    {
        active: true
    }, 
    function(tabs) {
        chrome.contentSettings.plugins.get({
            primaryUrl: tabs[0].url,
            resourceIdentifier: {
                id: 'adobe-flash-player'
            },
        }, updateIcon);
    
    }
    );
    
    function toggle() {
        var newSetting = isActive ? 'block' : 'allow';
        isActive = !isActive;
        chrome.contentSettings.plugins.set({
            primaryPattern: '<all_urls>',
            resourceIdentifier: {
                id: 'adobe-flash-player'
            },
            setting: newSetting
        }, updateIcon);
    }
    
    function updateIcon(status) {
        var image;
        
        if (status) {
            flashStatus = status;
            isActive = ['default', 'allow'].indexOf(flashStatus.setting) !== -1;
        }
        
        if (isActive) {
            image = './on.png';
        } else {
            image = './off.png';
        }
        
        chrome.browserAction.setIcon({
            path: image
        });
    }
    
    chrome.browserAction.onClicked.addListener(toggle);
};
script();