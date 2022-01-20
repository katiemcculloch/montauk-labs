import get from "axios";
import type { NextPage } from "next";
import React from "react";
import Organization from "../../pageComponents/OrganizationPage";
import { PatentWithExpDate } from "../../types";
import addExpirationDates from "../../utils/addExpirationDates";

const Organizations: NextPage<{ patents: PatentWithExpDate[] }> = ({
  patents,
}) => {
  return <Organization patents={patents} />;
};

export default Organizations;

Organizations.getInitialProps = async ({ query }) => {
  const getUrl = `https://api.patentsview.org/patents/query?q={"_eq":{"assignee_organization":"${query.orgName}"}}&f=["patent_date","app_date","patent_type","cpc_section_id"]`;
  const { data } = await get(getUrl);
  const patents = addExpirationDates(data.patents);
  return { patents };
};
