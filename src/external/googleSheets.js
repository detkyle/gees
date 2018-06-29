/*global $, GM_getValue*/
export function exportToGS(sheets, onSuccess = () => {}) {
  let gsUrl = GM_getValue("googleSheetsExecUrl");
  if (!gsUrl || gsUrl.length === 0) {
    alert("Need to set googleSheetsExecUrl to be able to export");
    return;
  }

  $.ajax({
    type: "POST",
    url: gsUrl,
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    data: JSON.stringify(sheets),
    success: result => {
      console.log("success", result);
      onSuccess();
    },
    failure: error => console.log("error", error)
  }).fail(error => console.log("error", error));
}
