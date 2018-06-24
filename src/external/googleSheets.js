/*global $*/
export function exportToGS(sheets) {
  $.ajax({
    type: "POST",
    url:
      "https://script.google.com/macros/s/AKfycbyWIg-tDU7BWP51xGk9hraSnDjoUEjNnR11qlm9LwVr20zCgzME/exec",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    data: JSON.stringify(sheets),
    success: result => console.log("success", result),
    failure: error => console.log("error", error)
  }).fail(error => console.log("error", error));
}
