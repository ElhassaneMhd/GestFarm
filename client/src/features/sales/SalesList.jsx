import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { Heading } from "@/components/app/Heading";
import { TableLayout } from "@/layouts/TableLayout";
import { useAddSale, useSales } from "./useSale";

export function SalesList() {
  const { sales, isLoading, error } = useSales();
  const { mutate: addSale } = useAddSale();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Heading count={sales?.length}>{t("app.sidebar.sales")}</Heading>
      <TableLayout
        data={sales || []}
        isLoading={isLoading}
        error={error}
        resourceName="Sales"
        columns={[
          {
            key: "name",
            displayLabel: "Owner",
            type: "string",
            visible: true,
          },
          {
            key: "status",
            displayLabel: "Status",
            visible: true,
            format: (status) => status,
          },
        ]}
        formFields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
        ]}
        fieldsToSearch={["name"]}
        downloadOptions={{
          pdfFileName: "Sales",
        }}
        onAdd={addSale}
        //   onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [
            {
              text: "Review",
              icon: <Eye size={16} />,
              onClick: (sheep) => navigate(`/app/sales/${sheep.id}`),
            },
            def.delete,
          ],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "Sales",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}
