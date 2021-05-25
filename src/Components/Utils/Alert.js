import swal from "@sweetalert/with-react";

export default function Alert(error) {
  return swal(error, {
    buttons: false,
    title: "Alert!",
  });
  // return swal(
  //   <div>
  //     <h1>Alert</h1>
  //     <h3>{error}</h3>
  //   </div>
  // );
}
