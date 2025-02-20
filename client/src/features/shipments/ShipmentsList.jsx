import { TableLayout } from "@/layouts/TableLayout";
import {
  useShipments,
  useAddShipment,
  useDeleteShipment,
} from "./useShipments";
import {
  Boxes,
  ChevronDown,
  Loader,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
} from "lucide-react";
import { Button, DropDown } from "@/components/ui";
import { CostumDropDown } from "../sheep/SheepList";
import { useSales } from "../sales/useSale";
import { useShippers } from "../users/useUser";

export function ShipmentsList() {
  const { shipments, error, isLoading } = useShipments();
  const { mutate: addShipment } = useAddShipment();
  const { mutate: deleteShipment } = useDeleteShipment();
  const status = ["PENDING", "DELIVERED", "CANCELLED"];

  const icons = {
    pending: <Package size={16} />,
    shipped: <Boxes size={16} />,
    delivered: <PackageCheck size={16} />,
    cancelled: <PackageX size={16} />,
    returned: <PackageMinus size={16} />,
  };

  return (
    <>
      {/* <Heading count={shipments?.length}>{t("app.sidebar.shipments")}</Heading> */}
      <TableLayout
        data={shipments || []}
        isLoading={isLoading}
        error={error}
        resourceName="shipments"
        columns={[
          {
            key: "id",
            displayLabel: "Id",
            type: "number",
            visible: true,
          },
          {
            key: "phone",
            displayLabel: "Phone",
            type: "string",
            visible: true,
          },
          {
            key: "address",
            displayLabel: "Address",
            type: "string",
            visible: true,
          },
          {
            key: "status",
            displayLabel: "Status",
            type: "string",
            visible: true,
            format: (status) => (
              <div className={`${status.toLowerCase()} w-fit`}>
                <span className="me-2 ">{status}</span>
                {icons[status.toLowerCase()]}
              </div>
            ),
          },
          {
            key: "shippingDate",
            displayLabel: "Shipping Date",
            type: "date",
            visible: true,
          },
        ]}
        formFields={[
          {
            name: "phone",
            label: "Phone",
            type: "text",
            required: true,
          },
          {
            name: "address",
            label: "Address",
            type: "text",
            required: true,
          },
          {
            name: "shippingDate",
            label: "Shipping Date",
            type: "date",
            required: true,
          },
          {
            name: "status",
            required: true,
            customComponent: <CostumDropDown dataName="status" data={status} />,
          },
          {
            name: "sale",
            required: true,
            customComponent: <SalesDropDown />,
          },
          {
            name: "shipper",
            required: true,
            customComponent: <ShippersDropDown />,
          },
        ]}
        defaultValues={{
          name: "",
          phone: "",
          address: "",
          status: "PENDING",
          shippingDate: "",
          sale: {},
        }}
        fieldsToSearch={["id", "address", "phone", "status"]}
        downloadOptions={{
          pdfFileName: "Shipments",
        }}
        onAdd={addShipment}
        onDelete={deleteShipment}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [def.edit, def.delete],
        }}
        selectedOptions={{
          deleteOptions: {
            resourceName: "shipment",
            onConfirm: (ids) => console.log(ids),
          },
        }}
      />
    </>
  );
}
export const SalesDropDown = ({ setValue, getValue }) => {
  const { sales } = useSales();
  const pendingSales = sales?.filter(
    (sale) => !["DELIVERED", "CANCELLED"].includes(sale?.status?.toLowerCase())
  );

  const selectedSale = getValue("sale") || null;
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
              Sale ({selectedSale ? 1 : 0})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {pendingSales?.map((e) => (
          <DropDown.Option
            onClick={() =>
              getValue("sale") === e.id
                ? setValue("sale", null)
                : setValue("sale", e.id)
            }
            isCurrent={getValue("sale") === e.id}
            key={e.id}
          >
            {e?.id} | {e?.name} | {e?.sheep.length} sheep
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};

export const ShippersDropDown = ({ setValue, getValue }) => {
  const { shippers, isLoading, error } = useShippers();
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
              Shipper ({getValue("shipper") ? 1 : 0})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        {isLoading && <Loader className=" animate-spin m-auto " />}
        {error && <p>{error}</p>}

        {shippers?.map((e) => (
          <DropDown.Option
            onClick={() =>
              getValue("shipper") === e.id
                ? setValue("shipper", null)
                : setValue("shipper", e.id)
            }
            isCurrent={getValue("shipper") === e.id}
            key={e.id}
          >
            {e?.username}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
