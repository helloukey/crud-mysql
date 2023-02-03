import { useContext } from "react";
import { PageContext } from "../context/PageContext";

const usePage = () => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("PageContext must be wrapped inside PageContextProvider");
  }

  return context;
};
export default usePage;
