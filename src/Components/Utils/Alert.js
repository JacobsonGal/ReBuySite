import swal from "@sweetalert/with-react";

export default function Alert(message) {
  return swal({
    title: "Alert",
    text: message,
    icon: "warning",
    dangerMode: true,
  });
}
