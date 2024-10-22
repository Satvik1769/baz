import React from "react";
import { useNavigate } from "react-router-dom";
const MatchCard = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>UPCOMING CRICKET MATCHES</h3>
        <p>Sri Lanka vs England ODI</p>
        <div style={styles.matchInfo}>
          <div style={styles.team}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg"
              alt="Sri Lanka"
              style={styles.flag}
            />
            <p>Sri Lanka</p>
          </div>
          <div>
            <p>Match starts in</p>
            <p style={styles.countdown}>23h 16m</p>
          </div>
          <div style={styles.team}>
            <img
              src="https://imgs.search.brave.com/8d3ZkPb8BkK5FB1beglpOcT3Kq7lY6HL6FwzeStNAz0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDQvMzQ0LTA1/MC05NDUzNjY3NC9G/bGFnLUVuZ2xhbmQu/anBn"
              style={styles.flag}
            />
            <p>England</p>
          </div>
        </div>
      </div>
      <div style={styles.prizeInfo}>
        <div>
          <p style={styles.prizePool}>Prize Pool</p>
          <h2>₹10 Crores</h2>
        </div>
        <div>
          <p style={styles.firstPrize}>1st Prize</p>
          <h2>₹1 Crore</h2>
        </div>
        <div>
          <p>28,17,210 spots left</p>
          <p>28,34,467 spots</p>
        </div>
      </div>
      <div style={styles.join}>
        <button style={styles.joinButton} onClick={() => navigate("/team")}>
          Join Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d32f2f",
  },
  matchInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flag: {
    width: "40px",
    height: "30px",
    marginBottom: "5px",
  },
  countdown: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  prizeInfo: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    marginBottom: "20px",
  },
  prizePool: {
    fontWeight: "bold",
    color: "#757575",
  },
  firstPrize: {
    fontWeight: "bold",
    color: "#4caf50",
  },
  join: {
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MatchCard;
