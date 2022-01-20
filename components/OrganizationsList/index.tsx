import { useRouter } from "next/router";

type Props = {
  setSelected: (org: any) => void;
  orgs: Org[];
};

type Org = {
  assignee_organization: string;
};

const OrganizationsList = ({ setSelected, orgs }: Props) => {
  const router = useRouter();
  const onClick = (orgName: string) => {
    setSelected(orgName);
    router.push(`/organizations/${orgName}`);
  };

  return (
    <div>
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
