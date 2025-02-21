// Elements in the browser action page
let copyButton = document.getElementById("copybutton");
let copyButtonJson = document.getElementById("copybuttonjson");
let pasteButton = document.getElementById("pastebutton");

function showResult(text, timeout) {
  let result = document.getElementById("result");
  result.innerText = text;
  setTimeout(() => {
    result.innerText = "";
  }, timeout);
}

// find the user defined presets in the injected script
copyButton.addEventListener("click", function () {
  chrome.tabs.query(
    {
      currentWindow: true,
    },
    function (tabs) {
      let content = "";
      for (let tab of tabs) {
        content += (tab.url || tab.pendingUrl) + "\n";
      }
      navigator.clipboard.writeText(content);
      showResult("Copied to clipboard", 2000);
    }
  );
});

copyButtonJson.addEventListener("click", function () {
  chrome.tabs.query(
    {
      currentWindow: true,
    },
    function (tabs) {
      let content = {};
      for (let tab of tabs) {
        cotent[tab.title] = tab.url || tab.pendingUrl;
      }
      navigator.clipboard.writeText(JSON.stringify(content));
      showResult("Copied JSON to clipboard", 2000);
    }
  );
});

pasteButton.addEventListener("click", function () {
  navigator.clipboard.readText().then((text) => {
    let urls = text.split("\n");
    for (let url of urls) {
      if (url) {
        chrome.tabs.create({
          url: url,
        });
      }
    }
  });
});
