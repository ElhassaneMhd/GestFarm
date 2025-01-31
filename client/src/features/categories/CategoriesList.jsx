import { useNavigate } from "react-router-dom";
import { useAddCategory, useCategories } from "./useCategory";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";
import { Heading } from "@/components/app/Heading";
import { TableLayout } from "@/layouts/TableLayout";

export function CategoriesList() {
  const { categories, isLoading, error } = useCategories();
  const { mutate: addCategory } = useAddCategory();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Heading count={categories?.length}>
        {t("app.sidebar.categories")}
      </Heading>
      <TableLayout
        data={categories || []}
        isLoading={isLoading}
        error={error}
        resourceName="Categories"
        columns={[
          {
            key: "id",
            displayLabel: "ID",
            type: "number",
            visible: true,
          },
          {
            key: "name",
            displayLabel: "Name",
            type: "string",
            visible: true,
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
          pdfFileName: "Categories",
        }}
        onAdd={addCategory}
        //   onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [
            {
              text: "Review",
              icon: <Eye />,
              onClick: (sheep) => navigate(`/app/categories/${sheep.id}`),
            },
            def.delete,
          ],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "Categories",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}
