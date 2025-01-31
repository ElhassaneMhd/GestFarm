import { useAddSheep, useAllSheep } from "./useSheep";
import { useCategories } from "@/features/categories/useCategory";
import { TableLayout } from "@/layouts/TableLayout";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Edit, Eye, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Heading } from "@/components/app/Heading";
import { DropDown, Button } from "@/components/ui";

export function SheepList() {
  const { sheep, error, isLoading } = useAllSheep();
  const { mutate: addSheep } = useAddSheep();
  const { navigate } = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Heading count={sheep?.length}>{t("app.sidebar.sheep")}</Heading>
      <TableLayout
        data={sheep}
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
            key: "weight",
            displayLabel: "Weight",
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
            key: "amount",
            displayLabel: "Amount",
            type: "number",
            visible: true,
          },
          {
            key: "saleStatus",
            displayLabel: "Status",
            type: "string",
            visible: true,
          },
        ]}
        formFields={[
          {
            name: "number",
            label: "Number",
            type: "number",
            min: 0,
            required: true,
          },
          {
            name: "weight",
            label: "Weight",
            type: "number",
            min: 0,
            required: true,
          },
          {
            name: "price",
            label: "Price",
            min: 0,
            type: "number",
            required: true,
          },
          {
            name: "saleStatus",
            label: "Status",
            type: "text",
            required: true,
            customComponent: <StatusDropDown />,
          },
          {
            name: "category",
            label: "Category",
            type: "number",
            customComponent: <CategoriesDropDown />,
          },
        ]}
        formDefaults={{
          number: 0,
          price: 0,
          weight: 0,
          amount: 0,
          saleStatus: "Status",
          category: {},
        }}
        onAdd={addSheep}
        fieldsToSearch={["number", "amount", "price"]}
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
              icon: <Eye size={16} />,
              onClick: (sheep) => navigate(`/app/sheep/${sheep.id}`),
            },
            {
              text: "Edit",
              icon: <Edit size={16} />,
              onClick: (sheep) => navigate(`/app/sheep/edit/${sheep.id}`),
            },

            def.delete,
          ],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "application",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}

const CategoriesDropDown = ({ getValue, setValue }) => {
  const { categories, error, isLoading } = useCategories();
  const categoryName = categories?.map((c) =>
    getValue("category").id === c.id ? c.name : null
  );
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Category</p>
      <DropDown
        options={{ className: "w-full" }}
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
          >
            <span className="p-0.5 text-sm font-medium text-text-tertiary w-full text-start">
              {categoryName ?? "Category"}
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName=" bg-background-secondary "
      >
        <DropDown.Title>Categories</DropDown.Title>
        <DropDown.Divider />

        {isLoading && <Loader className=" animate-spin m-auto " />}
        {error && <p>{error}</p>}

        {categories?.map((category) => (
          <DropDown.Option
            onClick={() => {
              setValue("category", { id: category.id });
            }}
            isCurrent={getValue("category").id === category.id}
            key={category.id}
          >
            {category.name}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};

const StatusDropDown = ({ getValue, setValue }) => {
  const statuses = ["Available", "Sold", "Reserved"];
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Status</p>
      <DropDown
        options={{ className: "w-full", placement: "top" }}
        position="top"
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
          >
            <span className="p-0.5 text-sm font-medium text-text-tertiary w-full text-start">
              {getValue("saleStatus") || "Status"}
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName=" bg-background-secondary "
      >
        <DropDown.Title>Status</DropDown.Title>
        <DropDown.Divider />

        {statuses.map((stat) => (
          <DropDown.Option
            onClick={() => {
              setValue("saleStatus", stat);
            }}
            isCurrent={getValue("saleStatus") === stat}
            key={stat}
          >
            {stat}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
