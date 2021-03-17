import React, { useEffect, useState } from "react";
import Page from "../../../Utils/Page";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationData } from "../../../Redux/actions/userDataActions";

const Notification = ({
  title,
  setTitle,
  notificationCount,
  setNotificationCount,
}) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const notificationData = useSelector(
    (state) => state.airTableData.Notification
  );
  useEffect(() => {
    if (!notificationData) {
      dispatch(fetchNotificationData());
    } else {
      setNotificationCount(notificationData.length);
      setLoading(false);
    }
  }, [notificationData, dispatch, fetchNotificationData, setLoading]);

  return (
    <Page
      loading={loading}
      title={title}
      color={"#fdeded"}
      setTitle={setTitle}
      add={false}
      //   boldPar={boldPar}
      //   par={par}
      FAB="none"
      dots={false}
    >
      {/* <DataTable
        title={title}
        setTitle={setTitle}
        notificationData={notificationData}
        notificationCount={notificationCount}
        setNotificationCount={setNotificationCount}
      /> */}
    </Page>
  );
};

export default Notification;
