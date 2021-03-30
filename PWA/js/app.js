if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/PWA/sw.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

// The ID of the extension we want to talk to.
var editorExtensionId = "nencnamkkbifemeefdkeamjinmlmomba";

fetch_data();

var x, delta_K, cpu_interval;
var delta_U, delta_time, cpu_usage_percentage;
var sum_K1=0;
var sum_U1=0;

var sum_K2=0;
var sum_U2=0;

var sum_TOTAL1=0;
var sum_TOTAL2=0;


function memory_percentage(){
  
  fetch_data();
  return Math.floor(100 - (x.memory.availableCapacity / x.memory.capacity * 100));

}

function cpu_usage() {

  cpu_interval = setInterval(loop, 2000);

  function loop() {
    fetch_data();
    for (var i = 0; i < x.cpu.numOfProcessors; i++) {
      sum_K1 = sum_K1 + x.cpu.processors[i].usage.kernel;
      sum_U1 = sum_U1 + x.cpu.processors[i].usage.user;
      sum_TOTAL1 = sum_TOTAL1 + x.cpu.processors[i].usage.total;
    }
    
    setTimeout(() => {
      fetch_data();
      for (var i = 0; i < x.cpu.numOfProcessors; i++) {
        sum_K2 = sum_K2 + x.cpu.processors[i].usage.kernel;
        sum_U2 = sum_U2 + x.cpu.processors[i].usage.user;
        sum_TOTAL2 = sum_TOTAL2 + x.cpu.processors[i].usage.total;
      }

      delta_K = Math.floor(sum_K2 - sum_K1);
      delta_U = Math.floor(sum_U2 - sum_U1);
      delta_TOTAL = Math.floor(sum_TOTAL2 - sum_TOTAL1);
      // console.log("delta K=", delta_K);
      // console.log("delta U=", delta_U);
      // console.log("delta TOTAL=", delta_TOTAL);

      cpu_usage_percentage = 100 - ((delta_K + delta_U) / delta_TOTAL  *100);
      console.log("cpu usage percentage=", cpu_usage_percentage);
    }, 1000);
  }

}

function fetch_data() {
  // Make a simple request:
  let url = "here this is message from the app for the extension";
  console.log("message sending.. from app to exstn")
  chrome.runtime.sendMessage(editorExtensionId, { openUrlInEditor: url },
    function (response) {
      x = JSON.parse(response.resp);
      console.log(x);
      // document.getElementById("cont").innerHTML = `<p> ${JSON.stringify(x)} </p>`;    //showing in html
    });
}



document.getElementById("btn").addEventListener("click", () => {
  fetch_data();
})

document.getElementById("btn2").addEventListener("click", () => {
  cpu_usage();
})

document.getElementById("btn3").addEventListener("click", () => {
  clearInterval(cpu_interval);
})

document.getElementById("btn4").addEventListener("click", () => {
  console.log(memory_percentage());
})



// function cpu_usage2() {
//   var cpuInfo = x.cpu;
//   var previousCpuInfo;
//   var sumOfUsage = 0;

//   for (var i = 0; i < cpuInfo.numOfProcessors; i++) {
//     var usage = cpuInfo.processors[i].usage;
//     var usedSectionWidth = 0;

//     if (previousCpuInfo) {
//       var oldUsage = previousCpuInfo.processors[i].usage;
//       usedSectionWidth = Math.floor((usage.kernel + usage.user - oldUsage.kernel - oldUsage.user) / (usage.total - oldUsage.total) * 100);
//     } else {
//       usedSectionWidth = Math.floor((usage.kernel + usage.user) / usage.total * 100);
//     }
//     console.log("used selection width=",usedSectionWidth);
//     sumOfUsage = sumOfUsage + usedSectionWidth;

//   }
//   previousCpuInfo = cpuInfo;
//   console.log("usage=",Math.floor(100 - sumOfUsage / 4));

//   // callback(Math.floor(100 - sumOfUsage / 4));
// }






