import get from "axios";
import debounce from "lodash.debounce";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Loader from "react-loader";
import Search from "../components/Search";

const Organizations: NextPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);

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
      <div>Selected</div>
      <div>{selected}</div>
      {!submitting &&
        results.map((r) => {
          const org = r.assignee_organization;
          return (
            <div
              onClick={() => {
                setSelected(org);
                router.push(`/organizations/${org}`);
              }}
            >
              {org}
            </div>
          );
        })}
    </div>
  );
};

export default Organizations;
