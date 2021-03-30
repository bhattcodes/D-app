var blocklistedIds = ["none"];
console.log("hello in backgroundjs exstnn");
let obj={};

function get_info() {


  chrome.system.cpu.getInfo(function (info) {
    // console.log(info);
    obj.cpu = info
  });

  chrome.system.storage.getInfo(function (info) {
    // console.log(info);
    obj.storage = info;
  });

  chrome.system.memory.getInfo(function (info) {
    // console.log(info);
    obj.memory = info;
  });

  chrome.system.display.getInfo(function (info) {
    // console.log(info);
    obj.display = info;
  });

  obj.navigator = window.navigator.appCodeName;

  // setTimeout(repeatitself,30000);   //repeat n take the system info after every 30 sec
}

// get_info();

// console.log(obj);


chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    if (sender.url == blocklistedIds)
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      get_info();

      console.log("after rqtdd",obj);

      console.log(request.openUrlInEditor);
    sendResponse({ resp: JSON.stringify(obj) });

  });
