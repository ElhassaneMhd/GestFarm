import {
  useAddUser,
  useDeleteUser,
  useMultipleDeleteUsers,
  usePaginateUsers,
  useUpdateUser,
} from "./useUser";
import { TableLayout } from "@/layouts/TableLayout";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RULES } from "@/utils/constants";
import { CostumDropDown } from "../sheep/SheepList";

export default function UsersList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const { users, error, isLoading } = usePaginateUsers(page, limit);

  const { mutate: addUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: multipledeleteUsers } = useMultipleDeleteUsers();

  const roles = ["FARMER", "SHIPPER", "USER"];
  const { t } = useTranslation();
  return (
    <>
      <TableLayout
        data={users || []}
        isLoading={isLoading}
        error={error}
        resourceName="User"
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
              <span className=" capitalize">{role.slice(5).toLowerCase()}</span>
            ),
          },
        ]}
        formFields={[
          {
            name: "username",
            label: t("form.username.label"),
            rules: { ...RULES.username },
          },
          {
            name: "email",
            type: "email",
            label: t("form.email.label"),
          },
          {
            name: "phone",
            label: t("form.phone.label"),
          },
          {
            name: "role",
            customComponent: <CostumDropDown dataName="role" data={roles} />,
          },
          {
            name: "password",
            type: "password",
            label: t("form.password.label"),
          },
          {
            name: "passwordConfirmation",
            type: "password",
            label: t("form.confirmPassword.label"),
            rules: { ...RULES.passwordConfirmation },
          },
        ]}
        fieldsToSearch={["username", "email"]}
        downloadOptions={{
          pdfFileName: "Users",
        }}
        onAdd={addUser}
        onUpdate={updateUser}
        onDelete={deleteUser}
        layoutOptions={{
          displayNewRecord: false,
          displayTableRecord: false,
          actions: (def) => [def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "user",
            onConfirm: (ids) => multipledeleteUsers(ids),
          },
        }}
      />
    </>
  );
}
