import React from "react";
import { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
function Success({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return show ? (
    <div>
      <div className="success">
        <CheckCircleOutlineIcon style={{ marginRight: 10 }} />
        {message}
      </div>
    </div>
  ) : null;
}

export default Success;
