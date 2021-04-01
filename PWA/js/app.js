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
// fetch_data();    

var x, delta_K, cpu_interval;
var delta_U, delta_time, cpu_usage_percentage;
var sum_K1 = 0;
var sum_U1 = 0;

var sum_K2 = 0;
var sum_U2 = 0;

var sum_TOTAL1 = 0;
var sum_TOTAL2 = 0;
var memory_inuse = 0;


function cpu_usage() {

  // cpu_interval = setInterval(loop, 2000);

  function loop() {
    fetch_data();
    sum_K1 = sum_U1 = sum_K2 = sum_U2 = sum_TOTAL1 = sum_TOTAL2 = 0;

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

      cpu_usage_percentage = 100 - ((delta_K + delta_U) / delta_TOTAL * 100);
      console.log("cpu usage percentage=", cpu_usage_percentage);
    }, 1000);

  }

}

function update_ui(obj) {

  let storage = 0;
  for (var i = 0; i < obj.storage.length; i++) {
    storage = storage + (obj.storage[i].capacity / 1000000000);
    console.log(storage);
  }

  document.querySelector("#content > div > div:nth-child(2) > div:nth-child(1) > div > div > div > div.col.mr-2 > div.text-dark.font-weight-bold.h5.mb-0 > span").innerHTML = obj.cpu.modelName;
  document.querySelector("#content > div > div:nth-child(2) > div:nth-child(4) > div > div > div > div.col.mr-2 > div.text-dark.font-weight-bold.h5.mb-0 > span").innerHTML = obj.cpu.archName;
  document.querySelector("#content > div > div:nth-child(2) > div:nth-child(3) > div > div > div > div.col.mr-2 > div.row.no-gutters.align-items-center > div > div > span").innerHTML = obj.cpu.numOfProcessors;
  document.querySelector("#content > div > div:nth-child(2) > div:nth-child(2) > div > div > div > div.col.mr-2 > div.text-dark.font-weight-bold.h5.mb-0 > span").innerHTML = Math.floor(storage) + " GB";
  memory_inuse= Math.floor(100 - (obj.memory.availableCapacity / obj.memory.capacity * 100));
  
  $(function () {
    let chart = document.querySelectorAll('canvas')[1].chart;

    chart.data.datasets[0].data[0] = memory_inuse;
    chart.data.datasets[0].data[1] = 100 - memory_inuse;
    chart.update();
    
  });

}

function fetch_data() {
  // Make a simple request:
  let url = "here this is message from the app for the extension";
  console.log("message sending.. from app to exstn")
  chrome.runtime.sendMessage(editorExtensionId, { openUrlInEditor: url },
    function (response) {
      x = JSON.parse(response.resp);
      console.log(x);
      
      update_ui(x);   

      // document.getElementById("cont").innerHTML = `<p> ${JSON.stringify(x)} </p>`;    //showing in html
    });
}



// document.getElementById("btn").addEventListener("click", () => {
//   fetch_data();
// })

// document.getElementById("btn2").addEventListener("click", () => {
//   cpu_usage();
// })

// document.getElementById("btn3").addEventListener("click", () => {
//   clearInterval(cpu_interval);
// })

// document.getElementById("btn4").addEventListener("click", () => {
//   console.log(memory_percentage());
// })









