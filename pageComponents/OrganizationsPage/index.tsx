import type { NextPage } from "next";
import Loader from "react-loader";
import OrganizationsList from "../../components/OrganizationsList";
import Search from "../../components/Search";
import useOrganizationSearch from "../../hooks/useOrganizationSearch";
import css from "./index.module.css";

const OrganizationsPage: NextPage = () => {
  const { submitting, results, onChangeInput } = useOrganizationSearch();
  return (
    <div className={css.container}>
      <div>
        <h3 className={css.header}>Search and select an organization:</h3>
        <Search onChange={onChangeInput} />
        <Loader loaded={!submitting} />
      </div>
      {!submitting && <OrganizationsList orgs={results} />}
    </div>
  );
};

export default OrganizationsPage;
