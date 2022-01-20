import type { NextPage } from "next";
import Loader from "react-loader";
import OrganizationsList from "../components/OrganizationsList";
import Search from "../components/Search";
import useOrganizationSearch from "../hooks/useOrganizationSearch";

const OrganizationsPage: NextPage = () => {
  const { submitting, results, onChangeInput } = useOrganizationSearch();
  return (
    <div>
      <div>
        <div>Search and select an organization:</div>
        <Search onChange={onChangeInput} />
        <Loader loaded={!submitting} />
      </div>
      {!submitting && <OrganizationsList orgs={results} />}
    </div>
  );
};

export default OrganizationsPage;
