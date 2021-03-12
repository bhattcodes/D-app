console.log("here content script running");

function repeatitself(){
    
    chrome.system.cpu.getInfo(function(info) {
        console.log(info);
    });
    
    chrome.system.storage.getInfo(function(info) {
        console.log(info);
    });
    
    chrome.system.memory.getInfo(function(info) {
        console.log(info);
    });
    
    chrome.system.display.getInfo(function(info) {
        console.log(info);
    });
    
    setTimeout(repeatitself,30000);
}


repeatitself();