export enum PatentType {
  design = "DESIGN",
  utility = "UTILITY",
  plant = "PLANT",
}
export type Application = {
  app_date: string;
  app_id: string;
};

export type CPCS = {
  cpc_section_id: string;
};

export type PatentNoExpDate = {
  patent_date: string;
  patent_type: PatentType;
  applications: Application[];
  cpcs: CPCS[];
};

export type PatentWithExpDate = PatentNoExpDate & { expiration_date: Date };
