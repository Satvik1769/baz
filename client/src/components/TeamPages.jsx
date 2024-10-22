import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TeamSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("wicketKeepers");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const base_url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const generatePlayer = (category) => ({
    id: faker.string.uuid(), // Updated method for UUID
    name: faker.person.fullName(), // Updated for generating names
    team: faker.helpers.arrayElement(["SL", "ENG"]),
    points: faker.number.int({ min: 0, max: 100 }), // Updated for numbers
    credits: faker.finance.amount(6, 10, 1),
    selectedBy: faker.number.float({ min: 0, max: 100, precision: 0.01 }), // Updated for float
  });

  const [players, setPlayers] = useState({
    wicketKeepers: Array.from({ length: 5 }, () =>
      generatePlayer("wicketKeepers")
    ),
    batters: Array.from({ length: 5 }, () => generatePlayer("batters")),
    allRounders: Array.from({ length: 3 }, () => generatePlayer("allRounders")),
    bowlers: Array.from({ length: 4 }, () => generatePlayer("bowlers")),
  });

  const selectPlayer = (player) => {
    const isPlayerSelected = selectedPlayers.some((p) => p.id === player.id);
    if (isPlayerSelected) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };
  const renderPlayers = (category) => {
    return (
      <div>
        {players[category].map((player) => (
          <div key={player.id} style={styles.playerCard}>
            <div>
              <strong>
                {player.name} ({player.team})
              </strong>
              <p>Selected by: {player.selectedBy}%</p>
              <button
                onClick={() => selectPlayer(player)}
                style={styles.selectButton}
              >
                {selectedPlayers.includes(player) ? "Remove" : "Add"}
              </button>
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
        ))}
      </div>
    );
  };

  const sendData = async () => {
    try {
      const result = await fetch(`${base_url}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ players: selectedPlayers }), // Convert to JSON string
      });

      // Check if the response is ok
      if (!result.ok) {
        throw new Error("Failed to create team");
      }

      const teamData = await result.json(); // Parse the JSON response
      console.log(teamData);
      toast.success("Team Created");
      navigate("/myteam");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create team");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Team</h2>
      <div>Maximum of 11 players from one team</div>
      <div style={styles.matchDetails}>
        <div>SL vs ENG</div>
        <div>Selected Players: {selectedPlayers.length}</div>
      </div>

      {/* Category Buttons */}
      <div style={styles.categoryButtons}>
        <button
          onClick={() => setSelectedCategory("wicketKeepers")}
          style={styles.categoryButton}
        >
          Wicket-Keepers
        </button>
        <button
          onClick={() => setSelectedCategory("batters")}
          style={styles.categoryButton}
        >
          Batters
        </button>
        <button
          onClick={() => setSelectedCategory("allRounders")}
          style={styles.categoryButton}
        >
          All-Rounders
        </button>
        <button
          onClick={() => setSelectedCategory("bowlers")}
          style={styles.categoryButton}
        >
          Bowlers
        </button>
      </div>

      {/* Players Display */}
      <div style={styles.playersContainer}>
        {renderPlayers(selectedCategory)}
      </div>

      <div style={styles.footer}>
        <button
          style={styles.previewButton}
          onClick={console.log(selectedPlayers)}
        >
          Preview
        </button>
        <button
          style={styles.nextButton}
          onClick={() => sendData()}
          disabled={selectedPlayers.length < 11 || selectedPlayers.length > 11}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  matchDetails: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  categoryButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  categoryButton: {
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    flex: 1,
    margin: "0 5px",
  },
  playersContainer: {
    marginBottom: "20px",
  },
  playerCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  selectButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  previewButton: {
    backgroundColor: "#ddd",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
  nextButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default TeamSelection;
