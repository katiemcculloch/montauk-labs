import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import OrganizationPatentsChart from "../../components/OrganizationPatentsChart";
import PatentSummary from "../../components/PatentSummary";
import { PatentWithExpDate } from "../../types";
import css from "./index.module.css";

const Organization: NextPage<{ patents: PatentWithExpDate[] }> = ({
  patents,
}) => {
  const router = useRouter();
  const org = router.query.orgName;

  const onClickBack = () => {
    router.push("/organizations");
  };

  return (
    <div className={css.container}>
      <div className={css.back} onClick={onClickBack}>
        <BiArrowBack className={css.backArrow} />
        Back to search
      </div>
      <h3>Organization: {org}</h3>
      <h5>Total patents: {patents.length}</h5>
      <div className={css.patentList}>
        {patents.map((p) => (
          <PatentSummary patent={p} />
        ))}
      </div>
      {/* WIP, not currently rendering */}
      <OrganizationPatentsChart patents={patents} />
    </div>
  );
};

export default Organization;
