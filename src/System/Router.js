import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserPage from "../Pages/UserPage";
import UserSearchPage from "../Pages/UserSearchPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserSearchPage} />
        <Route exact path="/user/:userLogin" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
