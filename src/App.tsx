import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Routes/Components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/${:movieId}"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;