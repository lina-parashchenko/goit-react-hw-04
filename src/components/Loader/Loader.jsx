import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <ClipLoader color="#3f51b5" size={40} />
    </div>
  );
}
