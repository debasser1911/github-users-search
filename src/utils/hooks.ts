import { LocationDescriptor } from "history";
import { useHistory } from "react-router-dom";

export const useRedirect = () => {
  const history = useHistory();
  return (to: LocationDescriptor<unknown>) => history.push(to);
};
