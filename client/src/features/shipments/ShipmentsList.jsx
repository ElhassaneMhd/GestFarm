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
import { Button, DropDown } from "@/components/ui";
import { CostumDropDown } from "../sheep/SheepList";

export function ShipmentsList() {
  const { shipments, error, isLoading } = useShipments();
  const { mutate: addShipment } = useAddShipment();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const status = ["Pending", "Delivered", "Cancelled"];

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
            customComponent: <CostumDropDown dataName="status" data={status} />,
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

