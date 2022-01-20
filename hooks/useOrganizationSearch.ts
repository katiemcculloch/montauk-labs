import get from "axios";
import debounce from "lodash.debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const useOrganizationSearch = () => {
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

  useEffect(() => {
    if (inputValue != "") {
      debounceGetData(inputValue)?.then(() => setSubmitting(false));
    } else {
      setResults([]);
    }
  }, [inputValue, submitting, setSubmitting]);

  const debounceGetData = useCallback(debounce(getData, 250), [getData]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setSubmitting(true);
    debounceGetData(e.currentTarget.value);
  };

  return Object.freeze({ inputValue, submitting, results, onChangeInput });
};

export default useOrganizationSearch;
