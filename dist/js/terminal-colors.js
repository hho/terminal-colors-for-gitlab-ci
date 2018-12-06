/* jshint strict:global, browser:true */
'use strict';

var pre = document.getElementsByTagName("pre")[0];
var text = pre.innerHTML;
var html = text.replace(/\x1b\[0K|section_(start|end):\d+:[a-z_]+\n/g, '')
  .replace(/\x1b\[(0;?)?m/g, '</span>')
  .replace(/\x1b\[([0-9;]+)m/g, function (_1, code, _2, _3) {
    return '</span><span class="sgr-' + code.replace(/;/g, ' sgr-') + '">';
  });

if (text.length != html.length) {
  pre.innerHTML = html;
}
