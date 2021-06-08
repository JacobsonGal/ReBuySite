import swal from "@sweetalert/with-react";

export default function Alert(message, success) {
  // enable vibration support
  window.navigator.vibrate =
    window.navigator.vibrate ||
    window.navigator.webkitVibrate ||
    window.navigator.mozVibrate ||
    window.navigator.msVibrate;

  if (window.navigator.vibrate) {
    // vibration API supported
  }
  window.navigator.vibrate(1000);

  return swal({
    title: success ? "" : "Alert",
    text: message,
    icon: success ? "success" : "warning",
    dangerMode: success ? false : true,
  });
}
