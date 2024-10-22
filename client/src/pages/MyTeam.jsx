import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyTeam() {
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const [teamData, setTeamData] = useState(null); // State to store team data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch team data
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

  // Function to render players in the team
  const renderPlayers = (players) => {
    return players.map((player) => (
      <div key={player.id} style={styles.playerCard}>
        <div>
          <strong>
            {player.name} ({player.team})
          </strong>
          <p>Selected by: {player.selectedBy}%</p>
        </div>
        <div>
          <p>Points: {player.points}</p>
          <p>Credits: {player.credits}</p>
        </div>
        <img
          src="https://imgs.search.brave.com/cBpmS8LWADMWjBaeiKF3_4pNIwALXT7rCoxNZ-pLT9k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcx/LmhzY2ljZG4uY29t/L2ltYWdlL3VwbG9h/ZC9mX2F1dG8sdF9k/c19zcXVhcmVfd182/NDAscV81MC9sc2Np/L2RiL1BJQ1RVUkVT/L0NNUy8zODMyMDAv/MzgzMjEzLnBuZw"
          style={{ height: "100px" }}
        />
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>My Team</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : teamData ? (
          teamData.players && teamData.players.length > 0 ? (
            <div>{renderPlayers(teamData.players)}</div>
          ) : (
            <p>No players found in your team.</p>
          )
        ) : null}
      </div>
    </>
  );
}

// Styles for the component
const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  playerCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};
