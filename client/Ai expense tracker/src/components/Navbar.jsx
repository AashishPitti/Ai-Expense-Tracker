import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();

    navigate("/login");
  };

  return (
    <nav>
      <h2>AI Expense Tracker</h2>

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
