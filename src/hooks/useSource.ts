import { useContext } from "solid-js";
import SourceContext from "../source-context";

export default function useSource() {
  return useContext(SourceContext)
}