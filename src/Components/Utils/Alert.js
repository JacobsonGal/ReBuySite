import swal from "@sweetalert/with-react";

export default function Alert(message, success) {
  return swal({
    title: success ? "" : "Alert",
    text: message,
    icon: success ? "success" : "warning",
    dangerMode: success ? false : true,
  });
}
export function deleteAlert(deleteAlert) {
  return swal({
    title: "Are you sure?",
    text: deleteAlert,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your Product has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Product file is safe!");
    }
  });
}
