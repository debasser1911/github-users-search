import UserPage from "./pages/UserPage";
import UserSearchPage from "./pages/UserSearchPage";
import { Route, Switch, MemoryRouter } from "react-router";

export const App = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/" component={UserSearchPage} />
        <Route exact path="/user/:userLogin" component={UserPage} />
      </Switch>
    </MemoryRouter>
  );
};

export default App;
