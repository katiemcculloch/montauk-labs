import { ChangeEvent } from "react";
import css from "./index.module.css";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ onChange }: Props) => {
  return (
    <div className={css.container}>
      <input onChange={onChange} placeholder="Search..."></input>
    </div>
  );
};

export default Search;
