import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";
import React, { useState } from "react";

export default function Dashboard() {
  const navigation = [
    { name: "Dashboard", href: "/", current: true },
    { name: "Team", href: "/team", current: false },
    { name: "Logout", href: "/login", current: false },
  ];
  return (
    <>
      <Navbar navigation={navigation} />
      <div className="flex  items-center justify-center h-screen">
        <MatchCard />
      </div>
    </>
  );
}
