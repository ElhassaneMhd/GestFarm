import { useAllSheep } from "./useSheep";
import { TableLayout } from "@/layouts/TableLayout";
import { useNavigate } from "react-router-dom";
import {  File } from "lucide-react";

export function SheepList() {
  const { sheep, error, isLoading } = useAllSheep();
  const { navigate } = useNavigate();

  console.log(sheep);
  return (
    <TableLayout
      data={sheep}
      isLoading={isLoading}
      error={error}
      resourceName="Sheep"
      columns={
        [
          // {
          //   key: "price",
          //   displayLabel: "Price",
          //   type:"number",
          //   visible:true,
          // },
        ]
      }
      fieldsToSearch={["amount", "price"]}
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
            icon: <File />,
            onClick: (sheep) => navigate(`/app/sheep/${sheep.id}`),
          },
          {
            text: "IsBuyable",
            icon: <File />,
            onClick: (sheep) => navigate(`/app/sheep/${sheep.id}`),
          },

          def.delete,
        ],
      }}
      selectedOptions={{
        actions: [
          ...[
            { text: "Approve", onClick: console.log(""), color: "green" },
            { text: "Reject", onClick: console.log(""), color: "orange" },
          ].map((el) => ({
            ...el,
            onClick: (ids, onClose) => {
              el.onClick(ids);
              onClose();
            },
            disabledCondition: (ids, data) =>
              data?.some(
                (sheep) => ids.includes(sheep.id) && sheep.status !== "Pending"
              ),
            message: (data) =>
              data.length === 1
                ? "This application has already been processed."
                : "Some of these applications have already been processed.",
          })),
        ],
        deleteOptions: {
          resourceName: "application",
          onConfirm: (ids) => console.log(ids),
        },
      }}
    />
  );
}
