import { useUsers } from "./useUser";

import { TableLayout } from "@/layouts/TableLayout";
import { useNavigate } from "react-router-dom";
import { File } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RULES } from "@/utils/constants";
function UsersList() {
  const { users, error, isLoading } = useUsers();
  const { navigate } = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <TableLayout
        data={users || []}
        isLoading={isLoading}
        error={error}
        resourceName="Users"
        columns={[
          {
            key: "id",
            displayLabel: "ID",
            type: "number",
            visible: true,
          },
          {
            key: "username",
            displayLabel: "Username",
            type: "string",
            visible: true,
          },
          {
            key: "email",
            displayLabel: "Email",
            type: "string",
            visible: true,
          },
          {
            key: "role",
            displayLabel: "Role",
            type: "string",
            visible: true,
            format: (role) => (
              <span className=" capitalize">
                {role.name.slice(5).toLowerCase()}
              </span>
            ),
          },
          {
            key: "createdAt",
            displayLabel: "Created At",
            type: "date",
            visible: true,
          },
        ]}
        formFields={[
          {
            name: "id",
            label: t("form.username.label"),
            rules: { ...RULES.username },
          },
        ]}
        fieldsToSearch={["username", "email"]}
        downloadOptions={{
          pdfFileName: "Users",
        }}
        //   onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: false,
          displayTableRecord: false,
          actions: (def) => [
            {
              text: "Review",
              icon: <File />,
              onClick: (sheep) => navigate(`/app/users/${sheep.id}`),
            },
            def.delete,
          ],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "user",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}

export default UsersList;
