import swal from "@sweetalert/with-react";

export default function Alert(message, success) {
  return swal({
    title: success ? "" : "Alert",
    text: message,
    icon: success ? "success" : "warning",
    dangerMode: success ? false : true,
  });
}
