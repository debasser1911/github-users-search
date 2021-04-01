import { useHistory } from "react-router-dom";

/**
 * @name useRedirect
 * @description Make react-router redirect
 */
export const useRedirect = () => {
  const history = useHistory();
  return (to) => history.push(to);
};
