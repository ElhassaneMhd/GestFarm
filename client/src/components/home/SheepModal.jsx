import { useSearchParams } from "react-router-dom";
import { Modal, Status } from "../ui";
import { useSheepByNumber } from "@/features/sheep/useSheep";
import {
  Calendar,
  DollarSign,
  Loader,
  Mail,
  MapPin,
  Phone,
  User,
  Weight,
} from "lucide-react";
import { Sheep } from "../ui/Sheep";

export function SheepModal({ setIsOpen, isOpen }) {
  const [searchParams] = useSearchParams();
  const sheepNumber = searchParams.get("number");
  const { sheep, error, isLoading } = useSheepByNumber(sheepNumber);
  return (
    <Modal
      isOpen={isOpen}
      className="p-5 min-h-[50%] sm:h-5/6 sm:w-3/4 md:h-fit md:border  lg:w-1/2"
      closeOnBlur={true}
      onClose={() => setIsOpen(false)}
    >
      <div className="relative grid grid-cols-1 ">
        {isLoading && (
          <Loader size={40} className="animate-spin m-auto mt-32" />
        )}
        {error && !isLoading && (
          <Status
            heading={"No Sheep found"}
            message={
              "Cannot find sheep with number " +
              sheepNumber +
              " , try with another number"
            }
            className="m-auto mt-32"
            status={"noResults"}
          />
        )}
        {!error && !isLoading && sheep && <SheepDetails sheep={sheep} />}
      </div>
    </Modal>
  );
}

const SheepDetails = ({ sheep }) => {
  const { number, categoryName, age, weight, price } = sheep;
  const { name, amount, status: saleStatus, price: salePrice } = sheep.sale;
  const {
    address,
    phone,
    shippingDate,
    status: shipmentStatus,
  } = sheep.shipment;
  const { username: shipper, phone: shipperPhone, email } = sheep.shipper;
  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toUpperCase()) {
        case "PARTIALLY":
          return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case "PENDING":
          return "bg-blue-100 text-blue-800 border-blue-300";
        default:
          return "bg-gray-100 text-gray-800 border-gray-300";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
          status
        )} shadow-sm`}
      >
        {status}
      </span>
    );
  };

  const ProgressBar = ({ amount, total }) => {
    const percentage = (amount / total) * 100;
    return (
      <div className="w-full bg-background-secondary rounded-full h-2.5 mt-2">
        <div
          className="bg-secondary h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex w-full items-center gap-3 p-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors duration-200">
      <div className="p-2 bg-secondary rounded-full">
        <Icon className="w-4 h-4 text-text-primary" />
      </div>
      <div>
        <p className="text-sm text-text-secondary   ">{label}</p>
        <p className="font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );

  const SectionTitle = ({ title }) => (
    <h3 className="text-lg font-semibold mb-2 text-text-primary border-b pb-2">
      {title}
    </h3>
  );

  return (
    <div className="bg-background-primary  rounded-2xl shadow-xl overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary px-6 py-3 text-white">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-lg">
            <Sheep className="w-8 h-8 " />
          </div>
          <div>
            <h2 className="text-2xl text-black font-bold">Sheep #{number}</h2>
            <p className="text-text-placeholder mt-1">
              {categoryName.toUpperCase()} • {age}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Basic Details */}
        <div className="grid grid-cols-2 gap-4">
          <InfoRow icon={Weight} label="Weight" value={`${weight} kg`} />
          <InfoRow
            icon={DollarSign}
            label="Price"
            value={`${price.toLocaleString()}Dh`}
          />
        </div>

        {/* Sale Information */}
        <div>
          <SectionTitle title="Sale Details" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoRow icon={User} label="Buyer" value={name} />
              <InfoRow
                icon={DollarSign}
                label="Total Price"
                value={`${salePrice.toLocaleString()}Dh`}
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-text-secondary">Payment Progress</p>
                <StatusBadge status={saleStatus} />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-text-tertiary">Amount Paid</span>
                <span className="font-medium">
                  {amount.toLocaleString()}Dh / {salePrice.toLocaleString()}Dh
                </span>
              </div>
              <ProgressBar amount={amount} total={salePrice} />
            </div>
          </div>
        </div>

        {/* Shipment Information */}
        <div>
          <SectionTitle title="Shipment Details" />
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoRow icon={MapPin} label="Delivery Address" value={address} />
              <InfoRow icon={Phone} label="Contact Number" value={phone} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={Calendar}
                label="Shipping Date"
                value={shippingDate}
              />
              <div className="flex items-center justify-end">
                <StatusBadge status={shipmentStatus} />
              </div>
            </div>
          </div>
        </div>

        {/* Shipper Information */}
        <div>
          <SectionTitle title="Shipper Information" />
          <div className="grid grid-cols-2 gap-4">
            <InfoRow icon={User} label="Username" value={shipper} />
            <InfoRow icon={Phone} label="Phone" value={shipperPhone} />
            <InfoRow icon={Mail} label="Email" value={email} />
          </div>
        </div>
      </div>
    </div>
  );
};
