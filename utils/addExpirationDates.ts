import { PatentNoExpDate, PatentType, PatentWithExpDate } from "../types";

export default function addExpirationDates(patents: PatentNoExpDate[]) {
  return patents.map((p) => {
    const isUtility = p.patent_type === PatentType.utility;
    const isPlant = p.patent_type === PatentType.plant;
    const isDesign = p.patent_type === PatentType.design;
    const patentDate = new Date(p.patent_date);
    const appDate = new Date(p.applications[0].app_date);

    if (isUtility || isPlant) {
      return addExpirationForDesignOrPlant({ patent: p, appDate });
    }
    if (isDesign) {
      return addExpirationForUtility({ patent: p, patentDate });
    }
    return addExpDate({ patent: p, fromDate: appDate, yearsMultiplier: 20 });
  });
}

type DesignOrPlantProps = {
  appDate: Date;
  patent: PatentNoExpDate;
};

const addExpirationForDesignOrPlant = ({
  appDate,
  patent,
}: DesignOrPlantProps): PatentWithExpDate => {
  var yearsMultiplier = 20;
  const twentyYearDateProxy = new Date("06-08-1995");
  if (appDate < twentyYearDateProxy) {
    yearsMultiplier = 17;
  }
  return addExpDate({ fromDate: appDate, patent, yearsMultiplier });
};

type UtilityProps = {
  patentDate: Date;
  patent: PatentNoExpDate;
};

const addExpirationForUtility = ({
  patentDate,
  patent,
}: UtilityProps): PatentWithExpDate => {
  var yearsMultiplier = 12;
  const fourteenYearDateProxy = new Date("05-14-2015");
  if (patentDate > fourteenYearDateProxy) {
    yearsMultiplier = 14;
  }
  return addExpDate({ fromDate: patentDate, patent, yearsMultiplier });
};

type AddExpDateProps = {
  fromDate: Date;
  yearsMultiplier: number;
  patent: PatentNoExpDate;
};

const addExpDate = ({
  fromDate,
  yearsMultiplier,
  patent,
}: AddExpDateProps): PatentWithExpDate => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerYear = msPerDay * 365;
  const expiration_date = new Date(
    fromDate.getTime() + msPerYear * yearsMultiplier
  );
  const withExpDate = patent as PatentWithExpDate;
  withExpDate["expiration_date"] = expiration_date;
  return withExpDate;
};
