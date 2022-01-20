import moment from "moment";
import React from "react";
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts";
import { PatentWithExpDate } from "../../types";
type Props = { patents: PatentWithExpDate[] };

const OrganizationPatentsChart = ({ patents }: Props) => {
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

  //   return <div className={css.container}>{renderLineChart}</div>;
  return null;
};

export default OrganizationPatentsChart;
