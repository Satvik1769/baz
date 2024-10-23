import React from "react";
import { useNavigate } from "react-router-dom";
import Timeline from "./Timeline";

const MatchCard = () => {
  const navigate = useNavigate();

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-[400px] sm:max-w-[500px] mx-auto shadow-md mt-5">
      <div className="text-center mb-5">
        <h3 className="text-xl font-bold text-red-600">
          UPCOMING CRICKET MATCHES
        </h3>
        <p className="mt-1">Sri Lanka vs England ODI</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/11/Flag_of_Sri_Lanka.svg"
              alt="Sri Lanka"
              className="w-10 h-8 mb-2"
            />
            <p>Sri Lanka</p>
          </div>
          <div className="text-center">
            <p>Match starts in</p>
            <p className="text-red-600 font-bold">23h 16m</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://imgs.search.brave.com/8d3ZkPb8BkK5FB1beglpOcT3Kq7lY6HL6FwzeStNAz0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJpdGFubmljYS5j/b20vNDQvMzQ0LTA1/MC05NDUzNjY3NC9G/bGFnLUVuZ2xhbmQu/anBn"
              alt="England"
              className="w-10 h-8 mb-2"
            />
            <p>England</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-center mb-5">
        <div className="flex flex-col">
          <p className="text-sm">Prize Pool</p>
          <strong className="text-xl font-bold">10 Crore</strong>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">1st Prize</p>
          <strong className="text-xl font-bold">1 Crore</strong>
        </div>
      </div>

      <Timeline />

      <div className="text-center mt-5">
        <button
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
          onClick={() => navigate("/team")}
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
