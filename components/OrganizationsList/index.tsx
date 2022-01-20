import { useRouter } from "next/router";
import css from "./index.module.css";

type Props = {
  orgs: Org[];
};

type Org = {
  assignee_organization: string;
};

const OrganizationsList = ({ orgs }: Props) => {
  const router = useRouter();
  const onClick = (orgName: string) => {
    router.push(`/organizations/${orgName}`);
  };

  return (
    <div className={css.container}>
      {orgs.map((r) => {
        const orgName = r.assignee_organization;
        return (
          <div key={orgName} onClick={() => onClick(orgName)}>
            {orgName}
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationsList;
