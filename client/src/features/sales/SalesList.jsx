import { ChevronDown } from "lucide-react";
import { TableLayout } from "@/layouts/TableLayout";
import {
  useAddSale,
  useMultipleDeleteSale,
  useDeleteSale,
  useSales,
  useUpdateSale,
} from "./useSale";
import { Button, CheckBox, DropDown } from "@/components/ui";
import { useAllSheep } from "../sheep/useSheep";
import { CostumDropDown } from "../sheep/SheepList";

export function SalesList() {
  const { sales, isLoading, error } = useSales();
  const { mutate: addSale } = useAddSale();
  const { mutate: updateSale } = useUpdateSale();
  const { mutate: deleteSale } = useDeleteSale();
  const { mutate: multipleDelete } = useMultipleDeleteSale();
  const status = ["PARTIALLY", "PAID", "DELIVERED", "CANCELLED"];
  return (
    <>
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
            key: "amount",
            displayLabel: "Amount",
            type: "number",
            visible: true,
            format: (amount) => `${amount} Dh`,
          },
          {
            key: "sheep",
            displayLabel: "Sheep",
            visible: true,
            format: (sheep) => sheep.length,
          },
          {
            key: "status",
            displayLabel: "Status",
            visible: true,
            format: (status) => (
              <span className=" capitalize">{status.toLowerCase()}</span>
            ),
          },
        ]}
        formFields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
          {
            name: "amount",
            label: "Amount",
            type: "number",
            required: true,
          },
          {
            name: "status",
            customComponent: <CostumDropDown dataName="status" data={status} />,
          },
          {
            name: "sheep",
            label: "Sheep",
            required: true,
            customComponent: <SheepDropDown />,
          },
        ]}
        fieldsToSearch={["name"]}
        downloadOptions={{
          pdfFileName: "Sales",
        }}
        onAdd={addSale}
        onUpdate={updateSale}
        onDelete={deleteSale}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit, def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "Sales",
            onConfirm: (ids) => multipleDelete(ids),
          },
        }}
      />
    </>
  );
}

export const SheepDropDown = ({ setValue, getValue }) => {
  const { sheep } = useAllSheep();
  let availableSheep = sheep?.filter(
    (sp) =>
      sp?.status?.toLowerCase() === "available" ||
      sp?.sale?.id === getValue("id")
  );
  const oldSheep = getValue("sheep") || [];
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Sheep</p>
      <DropDown
        options={{
          className: "w-48 ",
          shouldCloseOnClick: false,
          disabled: true,
        }}
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
            disabled={true}
          >
            <span className="text-sm font-medium w-full text-start ">
              Sheep ({oldSheep?.length})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {availableSheep?.map((sheep) => (
          <div key={sheep.id} className="flex flex-col gap-1">
            <div className="flex  gap-1 text-text-tertiary p-1">
              <span className="w-full text-sm text-text-tertiary">
                {sheep?.number} | {sheep?.category?.name}
              </span>
              <CheckBox
                checked={oldSheep?.map((e) => e.id)?.includes(sheep.id)}
                onChange={() => {
                  if (oldSheep?.map((e) => e.id)?.includes(sheep.id)) {
                    setValue(
                      "sheep",
                      oldSheep?.filter((s) => s.id !== sheep.id)
                    );
                  } else {
                    setValue("sheep", [...oldSheep, sheep]);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </DropDown>
    </div>
  );
};
