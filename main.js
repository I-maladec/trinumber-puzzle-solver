(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // main.ts
  var require_main = __commonJS({
    "main.ts"() {
      var fileInput = document.getElementById("fileInput");
      var processButton = document.getElementById("processButton");
      var resultArea = document.getElementById("resultArea");
      var lengthInfo = document.getElementById("lengthInfo");
      var worker = new Worker("./solverWorker.js");
      worker.addEventListener("message", (event) => {
        resultArea.value = event.data;
        lengthInfo.textContent = event.data.length.toString();
        processButton.disabled = false;
        processButton.textContent = "Find biggest sequence";
      });
      processButton.addEventListener("click", async () => {
        const file = fileInput.files?.[0];
        if (!file) {
          alert("Please select a file.");
          return;
        }
        const text = await file.text();
        processButton.disabled = true;
        processButton.textContent = "Finding sequence...";
        worker.postMessage(text);
      });
    }
  });
  require_main();
})();
