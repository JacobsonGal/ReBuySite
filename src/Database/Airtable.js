import axios from "axios";
import store from "../Redux/store";

console.log(store.getState());
export async function airTableData(table) {
  if (
    !localStorage.getItem("token") &&
    !store.getState()?.airTableData?.guest
  ) {
    return "unauthorized";
  }
  if (store.getState()?.airTableData?.guest) {
    let airTableData = await fetch(
      `https://azm2tgtcgw.herokuapp.com/api/v1/get-guest-data`,
      {
        method: "POST",
        headers: {
          Authorization: store.getState()?.airTableData?.guest,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table: table }),
      }
    );
    airTableData = await airTableData.json();
    console.log(airTableData);
    return airTableData;
  } else {
    let airTableData = await fetch(
      `https://azm2tgtcgw.herokuapp.com/api/v1/user-data/get-data`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ table: table }),
      }
    );
    airTableData = await airTableData.json();
    console.log(airTableData);

    if (table === "Users") {
      return airTableData.length > 0 ? airTableData : "unauthorized";
    }

    return airTableData;
  }
}

export async function airTableDoctors() {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/user-data/get-doctors`,
    { headers: { Authorization: localStorage.getItem("token") } }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function newData(table, data, file = false) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/sending-data/add-data`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, data }),
    }
  );
  airTableData = await airTableData.json();
  if (!airTableData.id) {
    return airTableData;
  }
  if (file && Array.isArray(file) && file.length > 0) {
    console.log(123);
    airTableData = await fileUpload(table, airTableData.id, file);
    console.log(airTableData);
  }
  return airTableData;
}

export async function updateData(
  table,
  data,
  id = store.getState()?.airTableData?.userData[0].id
) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/updating-data/update`,
    {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, data, id }),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function deleteData(table, id) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/updating-data/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, id }),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

async function fileUpload(table, id, file) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let formData = new FormData();
  formData.append("table", table);
  formData.append("id", id);
  file.forEach((x, i) => {
    formData.append(`file`, x);
  });
  var config = {
    method: "post",
    url: "https://azm2tgtcgw.herokuapp.com/api/v1/fileUpload/add-file",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  let airTableData = await axios(config);
  return airTableData.data;
}

export async function addContact(body) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/updating-data/add-contact`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  console.log(airTableData);
  airTableData = await airTableData.json();
  return airTableData;
}

export async function deleteContact(body) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/updating-data/delete-contact`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  console.log(airTableData);
  airTableData = await airTableData.json();
  return airTableData;
}

///  ככה צריך להיראות ה body:
///{"contactData":{
//     "First Name":"Aviel",
//     "Last Name":"Berg",
//     "Email":"dasdas@gamil.com",
//     "Phone":"97245446545"
// }}

export async function shereContact(body) {
  if (!localStorage.getItem("token")) {
    return "unauthorized";
  }
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/shere-contact`,
    {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function getGuest(token) {
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/get-guest`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function registerToDB(body) {
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/userLogin/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function gglSSO(body) {
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/userLogin/ggl-sso`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}

export async function gglSSOregister(body) {
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/userLogin/ggl-sso-register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}
export async function login(body) {
  let airTableData = await fetch(
    `https://azm2tgtcgw.herokuapp.com/api/v1/userLogin/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  airTableData = await airTableData.json();
  return airTableData;
}
