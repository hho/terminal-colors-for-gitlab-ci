chrome.runtime.onMessage.addListener(formatAnsi);
document.addEventListener("DOMContentLoaded", formatAnsi);

function injectCSS() {
  var link = document.createElement("link");
  link.href = chrome.runtime.getURL("css/terminal-colors.css");
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

function formatAnsi() {
  var pre = document.getElementsByTagName("pre")[0];
  var text = pre.innerHTML;
  var html = text.replace(/\x1b\[0K|section_(start|end):\d+:[a-z_]+\n/g, '')
    .replace(/\x1b\[(0;?)?m/g, '</span>')
    .replace(/\x1b\[([0-9;]+)m/g, function (_1, code, _2, _3) {
      return '</span><span class="sgr-' + code.replace(/;/g, ' sgr-') + '">';
    });
  
  if (text.length != html.length) {
    injectCSS();
    pre.innerHTML = html;
  }
}
