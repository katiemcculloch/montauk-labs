import moment from "moment";
import React from "react";
import { PatentWithExpDate } from "../../types";
import css from "./index.module.css";

type Props = {
  patent: PatentWithExpDate;
};

const PatentSummary = ({ patent }: Props) => {
  const { expiration_date, patent_date, applications, patent_type, cpcs } =
    patent;

  const exp = moment(expiration_date);

  return (
    <div className={css.container}>
      {applications.length > 0 && (
        <div>Patent ID: {applications[0].app_id}</div>
      )}
      <div>Patent date: {patent_date}</div>
      <div>Patent type: {patent_type}</div>
      <div>CPCS ID(s): {cpcs.map((c) => c.cpc_section_id)}</div>
      {applications.length > 0 && (
        <div>Application date: {applications[0].app_date}</div>
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
};

export default PatentSummary;
