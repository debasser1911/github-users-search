import { ReactNode } from "react";
import { Header } from "../components/";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default MainLayout;
