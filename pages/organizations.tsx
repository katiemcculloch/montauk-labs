import get from "axios";
import debounce from "lodash.debounce";
import type { NextPage } from "next";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Loader from "react-loader";
import Search from "../components/Search";

const Organizations: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);

  const getData = async (q: string) => {
    const getUrl = `https://api.patentsview.org/assignees/query?q={"_begins":{"assignee_organization":"${q}"}}&f=["patent_number","patent_date","assignee_organization","assignee_id"]`;
    const { data } = await get(getUrl);
    if (q === inputValue) {
      setResults(data.assignees);
    }
    setSubmitting(false);
    return data;
  };

  const debounceGetData = useCallback(debounce(getData, 250), [getData]);

  useEffect(() => {
    if (inputValue != "") {
      debounceGetData(inputValue)?.then(() => setSubmitting(false));
    } else {
      setResults([]);
    }
  }, [inputValue, submitting, setSubmitting]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setSubmitting(true);
    debounceGetData(e.currentTarget.value);
  };

  return (
    <div>
      <Search onChange={onChangeInput} />
      <Loader loaded={!submitting} />
      {!submitting && results.map((r) => <div>{r.assignee_organization}</div>)}
    </div>
  );
};

export default Organizations;
