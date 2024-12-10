import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="h-100 position-relative">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
