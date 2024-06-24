import React from "react";
import { useEffect, useState } from "react";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
function Error({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return show ? (
    <div>
      <div className="error">
        {" "}
        <PriorityHighIcon style={{ marginRight: 10 }} />
        {message}
      </div>
    </div>
  ) : null;
}

export default Error;
