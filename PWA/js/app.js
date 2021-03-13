if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }
  
//   // The ID of the extension we want to talk to.
// var editorExtensionId = "nencnamkkbifemeefdkeamjinmlmomba";

  var send=document.getElementById("send");

  send.addEventListener('click', function() {
    
    chrome.runtime.sendMessage(
      "nencnamkkbifemeefdkeamjinmlmomba", 
      {myCustomMessage: "hello form app.js"}, 
      function(response) { 
        console.log(response);
      })
  });


  blocklistedIds = ["none"];

  chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
      if (sender.id in blocklistedIds) {
        sendResponse({"result":"sorry, could not process your message"});
        return;  // don't allow this extension access
      } else if (request.myCustomMessage) {
        console.log("from "+"nencnamkkbifemeefdkeamjinmlmomba"+": "+request.myCustomMessage);
        sendResponse({"result":"Ok, got your message"});
      } else {
        sendResponse({"result":"Ops, I don't understand this message"});
      }
    });
