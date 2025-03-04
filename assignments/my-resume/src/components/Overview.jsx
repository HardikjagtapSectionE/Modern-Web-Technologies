import { useEffect, useState } from "react";
import { fetchOverview } from "../services/api";
import "../App.css";

const Overview = () => {
  const [overview, setOverview] = useState({});

  useEffect(() => {
    fetchOverview().then(setOverview);
  }, []);

  return (
    <div className="section overview">
      <h2>{overview.name}</h2>
      <h4>{overview.email}</h4>
      <h4>{overview.phone}</h4>
      <p>{overview.summary}</p>
    </div>
  );
};

export default Overview;
