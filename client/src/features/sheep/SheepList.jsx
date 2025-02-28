import {
  useAddSheep,
  useUpdateSheep,
  useDeleteSheep,
  useMultipleDeleteSheep,
  usePaginateSheep,
} from "./useSheep";
import { useCategories } from "@/features/categories/useCategory";
import { TableLayout } from "@/layouts/TableLayout";
import { ChevronDown } from "lucide-react";
import { DropDown, Button } from "@/components/ui";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SheepList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  const { sheep, error, isLoading } = usePaginateSheep(page, limit);
  const { mutate: addSheep } = useAddSheep();
  const { mutate: updateSheep } = useUpdateSheep();
  const { mutate: deleteSheep } = useDeleteSheep();
  const { mutate: multipleDelete } = useMultipleDeleteSheep();
  const status = ["UNLISTED", "AVAILABLE", "SOLD", "RESERVED"];
  const ages = {
    LAMBS: "0-1 year",
    YEARLINGS: "1-2 year",
    MATURE: "2-5 year",
    OLD: "5+ year",
  };

  return (
    <>
      {/* <Heading count={sheep?.length}>{t("app.sidebar.sheep")}</Heading> */}
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
            key: "age",
            displayLabel: "Age",
            type: "string",
            visible: true,
            format: (age) => (
              <span className="px-2 py-1 rounded-full">
                <span className={`${age?.toLowerCase()}`}>{ages[age]} </span>
              </span>
            ),
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
                <span className={`${status?.toLowerCase()} capitalize `}>
                  {status.toLowerCase()}{" "}
                </span>
              </span>
            ),
          },
          {
            key: "categoryName",
            displayLabel: "Category",
            type: "string",
            visible: true,
            format: (category) => (category ? category : "Any category"),
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
            name: "category",
            required: true,
            customComponent: <CategoriesDropDown />,
          },
          {
            name: "status",
            required: true,
            customComponent: <CostumDropDown dataName="status" data={status} />,
          },
          {
            name: "weight",
            label: "Weight (kg)",
            type: "number",
            min: 0,
            required: true,
          },
          {
            name: "age",
            required: true,
            customComponent: (
              <CostumDropDown dataName="age" data={Object.keys(ages)} />
            ),
          },
        ]}
        formDefaults={{
          number: 0,
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
  const { categories } = useCategories();
  const navigate = useNavigate();
  const categoryName = categories?.map(
    (c) => (getValue("category")?.id || getValue("category")) === c.id && c.name
  )[0];
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
              {typeof categoryName == "string" ? categoryName : "Category"}
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName=" bg-background-secondary "
      >
        {categories?.length == 0 && (
          <DropDown.Option onClick={() => navigate("/app/categories")}>
            any category available
          </DropDown.Option>
        )}
        <div className="h-min overflow-scroll">
          {categories?.length > 0 &&
            categories?.map((category) => (
              <DropDown.Option
                onClick={() => {
                  setValue("category", category.id);
                }}
                isCurrent={getValue("category")?.id === category.id}
                key={category.id}
              >
                {category.name}
              </DropDown.Option>
            ))}
        </div>
      </DropDown>
    </div>
  );
};

export const CostumDropDown = ({ data, dataName, getValue, setValue }) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary capitalize">
        {dataName}
      </p>
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
            <span className=" p-0.5 text-sm font-medium capitalize text-text-tertiary w-full text-start">
              {getValue(dataName)?.toLowerCase() || dataName}
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName=" bg-background-secondary "
      >
        {data.map((e) => (
          <DropDown.Option
            onClick={() =>
              getValue(dataName) === e
                ? setValue(dataName, null)
                : setValue(dataName, e)
            }
            isCurrent={getValue(dataName) === e}
            key={e}
            className=" capitalize"
          >
            {e.toLowerCase()}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
