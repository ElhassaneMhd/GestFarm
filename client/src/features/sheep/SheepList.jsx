import { useAllSheep } from "./useSheep";
import { TableLayout } from "@/layouts/TableLayout";
import { useNavigate } from "react-router-dom";
import { File, Heading } from "lucide-react";
import { useTranslation } from "react-i18next";
import { RULES } from "@/utils/constants";

export function SheepList() {
  const { sheep, error, isLoading } = useAllSheep();
  const { navigate } = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Heading count={sheep?.length}>{t("sheep")}</Heading>
      <TableLayout
        data={sheep || []}
        isLoading={isLoading}
        error={error}
        resourceName="Sheep"
        columns={[
          {
            key: "id",
            displayLabel: "ID",
            type: "number",
            visible: true,
          },
          {
            key: "amount",
            displayLabel: "Amount",
            type: "number",
            visible: true,
          },
          {
            key: "price",
            displayLabel: "Price",
            type: "number",
            visible: true,
          },
          {
            key: "saleStatus",
            displayLabel: "Status",
            type: "string",
            visible: true,
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
        fieldsToSearch={["amount", "price"]}
        downloadOptions={{
          pdfFileName: "Sheep",
        }}
        //   onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [
            {
              text: "Review",
              icon: <File />,
              onClick: (sheep) => navigate(`/app/sheep/${sheep.id}`),
            },
            {
              text: "IsBuyable",
              icon: <File />,
              onClick: (sheep) => navigate(`/app/sheep/${sheep.id}`),
            },

            def.delete,
          ],
        }}
        selectedOptions={{
          actions: [
            ...[
              { text: "Approve", onClick: console.log(""), color: "green" },
              { text: "Reject", onClick: console.log(""), color: "orange" },
            ].map((el) => ({
              ...el,
              onClick: (ids, onClose) => {
                el.onClick(ids);
                onClose();
              },
              disabledCondition: (ids, data) =>
                data?.some(
                  (sheep) =>
                    ids.includes(sheep.id) && sheep.status !== "Pending"
                ),
              message: (data) =>
                data.length === 1
                  ? "This application has already been processed."
                  : "Some of these applications have already been processed.",
            })),
          ],
          deleteOptions: {
            resourceName: "application",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}
