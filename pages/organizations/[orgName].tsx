import get from "axios";
import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts";

const Organizations: NextPage = ({ patents }) => {
  const router = useRouter();
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

  const org = router.query.orgName;

  return (
    <div>
      <h1>Organization: {org}</h1>
      {renderLineChart}
    </div>
  );
};

export default Organizations;

Organizations.getInitialProps = async ({ query }) => {
  const getUrl = `https://api.patentsview.org/patents/query?q={"_eq":{"assignee_organization":"${query.orgName}"}}&f=["patent_date","app_date","patent_type","cpc_section_id"]`;
  const { data } = await get(getUrl);
  const patents = getExpirationDate(data.patents);
  const countByYear = {};
  return { count: data.count, patents };
};

const getExpirationDate = (patents) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerYear = msPerDay * 365;

  return patents.map((p) => {
    const isUtility = p.patent_type === "utility";
    const isPlant = p.patent_type === "plant";
    const isDesign = p.patent_type === "design";
    const splitPatentDate = p.patent_date.split("-");
    const patentDate = new Date(splitPatentDate);
    const splitAppDate = p.applications[0].app_date.split("-");
    const appDate = new Date(splitAppDate);

    var yearsMultiplier = 0;
    if (isUtility || isPlant) {
      const twentyYearDateProxy = new Date("06-08-1995");
      if (appDate < twentyYearDateProxy) {
        yearsMultiplier = 17;
        const expiration_date = new Date(
          appDate.getTime() + msPerYear * yearsMultiplier
        );
        p["expiration_date"] = expiration_date;
        return p;
      }
    }
    if (isDesign) {
      var yearsMultiplier = 12;
      const fourteenYearDateProxy = new Date("05-14-2015");
      if (patentDate > fourteenYearDateProxy) {
        yearsMultiplier = 14;
      }
      const expiration_date = new Date(
        patentDate.getTime() + msPerYear * yearsMultiplier
      );
      p["expiration_date"] = expiration_date;
      return p;
    }
    yearsMultiplier = 20;
    const expiration_date = new Date(
      appDate.getTime() + msPerYear * yearsMultiplier
    );
    p["expiration_date"] = expiration_date;

    return p;
  });
};
