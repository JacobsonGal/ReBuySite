import swal from "@sweetalert/with-react";

export default function Alert(message, success) {
  // enable vibration support
  navigator.vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

  if (navigator.vibrate) {
    // vibration API supported
    navigator.vibrate(1000);
  }

  return swal({
    title: success ? "" : "Alert",
    text: message,
    icon: success ? "success" : "warning",
    dangerMode: success ? false : true,
  });
}
