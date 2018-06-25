/*global $, GM_getValue*/
export function exportToGS(sheets) {
  let gsUrl = GM_getValue("googleSheetsExecUrl");
  $.ajax({
    type: "POST",
    url: gsUrl,
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    data: JSON.stringify(sheets),
    success: result => console.log("success", result),
    failure: error => console.log("error", error)
  }).fail(error => console.log("error", error));
}
