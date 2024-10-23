import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // remove token from local storage
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-red-600 h-[100px] flex items-center justify-between px-8">
      <h1 className="text-white text-xl">Dream 11</h1>
      <div className="text-white space-x-4">
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}
