chrome.runtime.onInstalled.addListener(registerRules);

function registerRules() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            originAndPathMatches: '^https?://.+?/-/jobs/\\d+/raw$'
          },
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
        new chrome.declarativeContent.RequestContentScript({
          js: ["js/terminal-colors.js"]
        })
      ]
    }]);
  });
}

chrome.pageAction.onClicked.addListener(function (tab) {
  var tabOrigin = new URL(tab.url).origin;
  chrome.permissions.request({
    origins: [tabOrigin + "/*"]
  }, function (granted) {
    if (granted) {
      chrome.tabs.executeScript(tab.id, {
        file: "js/terminal-colors.js"
      }, function () {
        chrome.tabs.sendMessage(tab.id, {});
      });
    } else {
      console.log("Permission denied");
    }
  });
});
