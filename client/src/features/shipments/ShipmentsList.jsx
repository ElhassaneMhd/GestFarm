import { Heading } from "@/components/app/Heading";
import { TableLayout } from "@/layouts/TableLayout";
import { useShipments, useAddShipment } from "./useShipments";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Boxes,
  ChevronDown,
  Eye,
  Loader,
  Package,
  PackageCheck,
  PackageMinus,
  PackageX,
} from "lucide-react";
import { useAllSheep } from "../sheep/useSheep";
import { Button, DropDown } from "@/components/ui";
import { CheckBox } from "@/components/ui";

export function ShipmentsList() {
  const { shipments, error, isLoading } = useShipments();
  const { mutate: addShipment } = useAddShipment();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const icons = {
    pending: <Package size={16} />,
    shipped: <Boxes size={16} />,
    delivered: <PackageCheck size={16} />,
    cancelled: <PackageX size={16} />,
    returned: <PackageMinus size={16} />,
  };

  return (
    <>
      <Heading count={shipments?.length}>{t("app.sidebar.shipments")}</Heading>
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
            name: "name",
            label: "Name",
            type: "text",
            required: true,
          },
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
            customComponent: <StatusDropDown />,
          },
          {
            name: "sheep",
            label: "Sheep",
            required: true,
            customComponent: <ShipmentsDropDown />,
          },
        ]}
        defaultValues={{
          name: "",
          phone: "",
          address: "",
          status: "Pending",
          shippingDate: "",
          sheep: [],
        }}
        fieldsToSearch={["name", "address", "phone", "status"]}
        downloadOptions={{
          pdfFileName: "Shipments",
        }}
        onAdd={addShipment}
        //onDelete={deleteApplication}
        layoutOptions={{
          displayNewRecord: true,
          displayTableRecord: true,
          actions: (def) => [
            {
              text: "Review",
              icon: <Eye size={18} />,
              onClick: (sheep) => navigate(`/app/shipments/${sheep.id}`),
            },
            def.delete,
          ],
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

const ShipmentsDropDown = ({ setValue, getValue }) => {
  const { sheep, error, isLoading } = useAllSheep();
  const availableSheep = sheep?.filter(
    (sheep) => sheep?.status?.toLowerCase() === "available"
  );

  const selectedSheep = getValue("sheep") || [];
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Sheep</p>
      <DropDown
        options={{ className: "w-48 ", shouldCloseOnClick: false }}
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
          >
            <span className="text-sm font-medium w-full text-start ">
              Sheep ({selectedSheep?.length})
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName="text-text-tertiary bg-background-secondary"
      >
        <DropDown.Title>
          <span className=" text-text-tertiary ">Available Sheep</span>{" "}
        </DropDown.Title>
        <DropDown.Divider />

        {isLoading && <Loader className=" animate-spin m-auto " />}
        {error && <p>{error}</p>}

        <div className="overflow-scroll flex gap-1 flex-col">
          {availableSheep?.map((sheep) => (
            <div key={sheep.id} className="flex flex-col gap-1">
              <div className="flex  gap-1 text-text-tertiary p-1">
                <span className="w-full text-sm text-text-tertiary">
                  {" "}
                  {sheep.number} | {sheep?.category?.name}
                </span>
                <CheckBox
                  checked={selectedSheep.some((s) => s.id === sheep.id)}
                  onChange={() => {
                    if (selectedSheep.some((s) => s.id === sheep.id)) {
                      setValue(
                        "sheep",
                        selectedSheep.filter((s) => s.id !== sheep.id)
                      );
                    } else {
                      setValue("sheep", [...selectedSheep, { id: sheep.id }]);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </DropDown>
    </div>
  );
};

const StatusDropDown = ({ getValue, setValue }) => {
  const statuses = ["Pending", "Delivered", "Cancelled"];
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
              setValue("status", stat);
            }}
            isCurrent={getValue("status") === stat}
            key={stat}
          >
            {stat}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
