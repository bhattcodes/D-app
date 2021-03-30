if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/PWA/sw.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }
  
  // The ID of the extension we want to talk to.
var editorExtensionId = "nencnamkkbifemeefdkeamjinmlmomba";


document.getElementById("btn").addEventListener("click", ()=>{
  
// Make a simple request:
let url = "here this is message from the app for the extension";
console.log("message sending.. from app to exstn")
chrome.runtime.sendMessage(editorExtensionId, {openUrlInEditor: url},
  function(response) {
    x = (response.resp);
    console.log(x);
    // document.getElementById("cont").innerHTML = `<p> ${JSON.stringify(x)} </p>`;    //showing in html
  });
})





