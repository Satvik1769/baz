import Navbar from "../components/Navbar";
import TeamSelection from "../components/TeamPages";
import { React, useState, useEffect } from "react";
import MyTeam from "./MyTeam";
export default function Team() {
  const [visible, setVisible] = useState(false);
  const [teamData, setTeamData] = useState(null); // State to store team data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const base_url = process.env.REACT_APP_BACKEND_URL;

  // get users team
  const getData = async () => {
    try {
      const response = await fetch(`${base_url}/teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch team data");
      }

      const data = await response.json();
      setTeamData(data); // Store the fetched team data
    } catch (err) {
      setError(err.message); // Handle error
    } finally {
      setLoading(false); // Turn off loading state
    }
  };

  // Fetch team data when the component mounts
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {!visible && !teamData && (
        <>
          <Navbar />

          <div className="flex flex-col items-center">
            <img
              style={{ height: "300px", width: "450px", marginTop: "20px" }}
              src="https://imgs.search.brave.com/Zk5WO92r-mRmSRyPQD2MWNwsKrIwRBtsQ5Yejwr0uls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVhbXNuYXAuY29t/L3VzZXIvcGFnZXMv/MDUuY29tbXVuaXR5/L3Nwb3J0cy1waG90/b2dyYXBoeS90aXBz/LWZyb20tYS1wcm8v/dGFraW5nLWEtZ3Jl/YXQtdGVhbS1waG90/by9Db3JyZWN0VGVh/bVNldHVwLmpwZw"
              alt="Team Setup"
            />
            <button
              className="btn text-white btn-error mt-4"
              onClick={() => setVisible(true)}
            >
              Create Your Own Team
            </button>
          </div>
        </>
      )}

      {visible && (
        <>
          <Navbar />
          <TeamSelection />
        </>
      )}

      {teamData && <MyTeam />}
    </div>
  );
}
