import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";

export default function Settings({ title, setTitle }) {
  const [place, setPlace] = useState("");

  const Wrap = () => (
    <Card className="settings">
      {/* <Card.Header>
        <Card.Subtitle style={{ textAlign: "center" }}>
          <Card.Title style={{ fontSize: "40px" }}>הגדרות כלליות </Card.Title>
          <Button
            size="md"
            variant="flat"
            onClick={() => setPage("ClinicalSettings")}
          >
            מטפלים
          </Button>{" "}
          {" | "}
          <Button
            size="md"
            variant="flat"
            onClick={() => setPage("InsuranceSettings")}
          >
            ביטוח
          </Button>{" "}
          {" | "}
          <Button
            size="md"
            variant="flat"
            onClick={() => setPage("FamilySettings")}
          >
            אנשי קשר
          </Button>{" "}
          {" | "}
          <Button
            size="md"
            variant="flat"
            onClick={() => setPage("PaymentSettings")}
          >
            תשלום
          </Button>{" "}
        </Card.Subtitle>
      </Card.Header>

      <Card.Body>
        <HandleActive loc={place} />
      </Card.Body>
      <style type="text/css">
        {`
    .btn-flat {
      padding:0px;
	  background-color: #9dccf1;
	  opacity:0.9;
      color: #3764fd;
    }
    `}
      </style> */}
    </Card>
  );

  return <Wrap />;
}
