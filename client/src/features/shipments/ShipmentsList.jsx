import { Heading } from "@/components/app/Heading";
import { TableLayout } from "@/layouts/TableLayout";
import { useShipments } from "./useShipments";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Eye, Loader } from "lucide-react";
import { useAllSheep } from "../sheep/useSheep";
import { useState } from "react";
import { Button, DropDown } from "../../components/ui";

export function ShipmentsList() {
  const { shipments, error, isLoading } = useShipments();
  const [otherFields, setOtherFields] = useState({ sheep: [] });
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          },
          {
            key: "createdAt",
            displayLabel: "Created At",
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
            name: "status",
            label: "Status",
            type: "text",
            required: true,
          },
          {
            name: "sheep",
            label: "Sheep",
            required: true,
            customComponent: (
              <ShipmentsDropDown
                otherFields={otherFields}
                setOtherFields={setOtherFields}
              />
            ),
          },
        ]}
        defaultValues={{
          name: "",
          phone: "",
          address: "",
          status: "",
          // ...otherFields,
        }}
        fieldsToSearch={["name", "address", "phone", "status"]}
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
              icon: <Eye />,
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

const ShipmentsDropDown = ({ otherFields, setOtherFields }) => {
  const { sheep, error, isLoading } = useAllSheep();

  console.log(otherFields);
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-sm font-medium text-text-tertiary">Sheep</p>
      <DropDown
        options={{ className: "w-full" }}
        toggler={
          <Button
            display="with-icon"
            size="small"
            type="outline"
            color="tertiary"
          >
            <span className="text-sm font-medium w-full text-start ">
              Sheep
            </span>
            <ChevronDown className="text-text-tertiary" />
          </Button>
        }
        togglerClassName=" text-text-tertiary bg-background-secondary "
      >
        <DropDown.Title>Sheep</DropDown.Title>
        <DropDown.Divider />

        {isLoading && <Loader className=" animate-spin m-auto " />}
        {error && <p>{error}</p>}

        {sheep?.map((sheep) => (
          <DropDown.Option
            onClick={() => {
              setOtherFields({
                ...otherFields,
                ["sheep"]: [...otherFields["sheep"], sheep.number],
              });
            }}
            isCurrent={otherFields.sheep.includes(sheep.number)}
            key={sheep.id}
          >
            {sheep.number}
          </DropDown.Option>
        ))}
      </DropDown>
    </div>
  );
};
