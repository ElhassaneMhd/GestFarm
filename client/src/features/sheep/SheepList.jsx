import {
  useAddSheep,
  useAllSheep,
  useUpdateSheep,
  useDeleteSheep,
  useMultipleDeleteSheep,
} from "./useSheep";
import { useCategories } from "@/features/categories/useCategory";
import { TableLayout } from "@/layouts/TableLayout";
import { ChevronDown, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Heading } from "@/components/app/Heading";
import { DropDown, Button } from "@/components/ui";

export function SheepList() {
  const { sheep, error, isLoading } = useAllSheep();
  const { mutate: addSheep } = useAddSheep();
  const { mutate: updateSheep } = useUpdateSheep();
  const { mutate: deleteSheep } = useDeleteSheep();
  const { mutate: multipleDelete } = useMultipleDeleteSheep();
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
            key: "number",
            displayLabel: "Number",
            type: "number",
            visible: true,
          },
          {
            key: "weight",
            displayLabel: "Weight",
            type: "number",
            visible: true,
            format: (weight) => `${weight} kg`,
          },
          {
            key: "price",
            displayLabel: "Price",
            type: "number",
            visible: true,
            format: (price) => `${price} Dh`,
          },
          {
            key: "status",
            displayLabel: "Status",
            type: "string",
            visible: true,
            format: (status) => (
              <span className="px-2 py-1 rounded-full">
                <span className={`${status?.toLowerCase()}`}>{status} </span>
              </span>
            ),
          },
          {
            key: "categoryName",
            displayLabel: "Category",
            type: "string",
            visible: true,
          },
        ]}
        formFields={[
          {
            name: "number",
            label: "Number",
            type: "number",
            min: 1000,
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
            name: "status",
            required: true,
            customComponent: <StatusDropDown />,
          },
          {
            name: "category",
            required: true,
            customComponent: <CategoriesDropDown />,
          },
        ]}
        formDefaults={{
          number: 0,
          price: 0,
          weight: 0,
          status: "UNLISTED",
          category: null,
        }}
        onAdd={addSheep}
        onUpdate={updateSheep}
        onDelete={deleteSheep}
        fieldsToSearch={["number", "amount", "price", "status"]}
        downloadOptions={{
          pdfFileName: "Sheep",
        }}
        //   onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit, def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "sheep",
            onConfirm: (ids) => multipleDelete(ids),
          },
        }}
      />
    </>
  );
}

const CategoriesDropDown = ({ getValue, setValue }) => {
  const { categories, error, isLoading } = useCategories();
  const categoryName = categories?.map((c) =>
    getValue("category")?.id === c.id ? c.name : null
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
              {getValue("category")?.id ? categoryName : "Category"}
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
            isCurrent={getValue("category")?.id === category.id}
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
  const statuses = ["Unlisted", "Available", "Sold", "Reserved"];
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Status</p>
      <DropDown
        options={{ className: "w-full" }}
        position="top"
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
            disabled={true}
          >
            <span className="p-0.5 text-sm font-medium text-text-tertiary w-full text-start">
              {getValue("status") || "Status"}
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
              setValue("status", stat.toUpperCase());
            }}
            isCurrent={getValue("status") === stat.toUpperCase()}
            key={stat}
          >
            {stat}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
