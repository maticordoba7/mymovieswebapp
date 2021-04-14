import { useContext } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { StoreContext } from "./store/StoreProvider";
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Auth from "./components/Auth";
import './index.css'
function App() {
  const [store] = useContext(StoreContext);
  const { isLoggedIn } = store
  console.log(isLoggedIn)
  return (
    <Router>
      {!isLoggedIn ? <Route path="/" component={Auth} /> : <Route path="/" component={ProtectedRoutes} />}
      {!isLoggedIn && <Redirect to="/" />}
    </Router>
  );
}

export default App;
