$("#gees-root").remove();
$("body").append("<div id='gees-root' />");

$(document).ready(function() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://localhost:3000/static/js/bundle.js";
  document.getElementsByTagName("head")[0].appendChild(script);
});
