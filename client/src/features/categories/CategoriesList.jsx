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
            key: "name",
            displayLabel: "Owner",
            type: "string",
            visible: true,
          },
          {
            key: "sheep",
            displayLabel: "Total",
            type: "array",
            visible: true,
            format: (sheep) => sheep.length,
          },
          {
            key: "sheep",
            displayLabel: "Status",
            visible: true,
            format: (sheep) => <SheepStatus sheep={sheep} />,
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

function SheepStatus({ sheep }) {
  let reserved = 0;
  let totalSheep = sheep.length;
  let availableSheep = 0;
  let soldSheep = 0;
  sheep.forEach((sheep) => {
    if (sheep.status === "Sold") soldSheep += 1;
    if (sheep.status === "Reserved") reserved += 1;
  });
  availableSheep = totalSheep - soldSheep - reserved;

  return (
    <div className="flex items-center">
      <span className="pending rounded-r-none bg-[#e5f5e0] text-green-600 ">
        {availableSheep} Available
      </span>
      <span className="pending rounded-none text-blue-700 bg-blue-200">
        {soldSheep} Sold
      </span>
      <span className="pending  rounded-l-none"> {reserved} Reserved</span>
    </div>
  );
}
