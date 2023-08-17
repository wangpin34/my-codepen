import SourceContext from "contexts/source-context";
import { useContext } from "solid-js";

export default function useSource() {
  return useContext(SourceContext)
}