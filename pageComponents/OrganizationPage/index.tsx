import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import { PatentWithExpDate } from "../../types";
import css from "./index.module.css";

const Organization: NextPage<{ patents: PatentWithExpDate[] }> = ({
  patents,
}) => {
  const router = useRouter();
  const org = router.query.orgName;

  const renderLineChart = (
    <ScatterChart
      width={300}
      height={300}
      data={patents}
      margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
    >
      <XAxis
        dataKey="expiration_date"
        tickFormatter={(unixTime) => moment(unixTime).format("mm/yyyy")}
        type="number"
      />
      <YAxis dataKey="patent_type" />
      <Scatter stroke="#ccc" fill="black" strokeDasharray="5 5" />
    </ScatterChart>
  );

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
      <h5> Total patents: {patents.length}</h5>
      <div className={css.patentList}>
        {patents.map((p) => {
          const exp = moment(p.expiration_date);
          const pat = moment(p.patent_date);
          return (
            <div className={css.patentInfo}>
              {p.applications.length > 0 && (
                <div>Patent ID: {p.applications[0].app_id}</div>
              )}
              <div>Patent date: {p.patent_date}</div>
              <div>Patent type: {p.patent_type}</div>

              <div>CPCS ID(s): {p.cpcs.map((c) => c.cpc_section_id)}</div>

              {p.applications.length > 0 && (
                <div>Application date: {p.applications[0].app_date}</div>
              )}
              <div>
                Expiration date: {exp.year()}-
                {exp.month().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
                -
                {exp.day().toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <div>Expires {exp.fromNow()}.</div>
            </div>
          );
        })}
      </div>
      {renderLineChart}
    </div>
  );
};

export default Organization;
