var blocklistedIds = ["none"];
console.log("hello in backgroundjs exstnn");


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
    
    // setTimeout(repeatitself,30000);   //repeat n take the system info after every 30 sec
}


repeatitself();




chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.url == blocklistedIds)
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      console.log(request.openUrlInEditor);
      sendResponse({resp: "response from the extension,to app got ur messsage succsfully"});

    });








// chrome.runtime.onMessageExternal.addListener(
//   function(request, sender, sendResponse) {
//     if (sender.id in blocklistedIds) {
//       sendResponse({"result":"sorry, could not process your message"});
//       return;  // don't allow this extension access
//     } else if (request.myCustomMessage) {
//       console.log('Got message from ',sender.id, request.myCustomMessage);
//       sendResponse({"result":"Ok, got your message"});
//     } else {
//       sendResponse({"result":"Ops, I don't understand this message"});
//     }
//   });


