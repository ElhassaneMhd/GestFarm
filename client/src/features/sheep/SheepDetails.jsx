import { useParams } from "react-router-dom";
import { useSheep } from "./useSheep";

function SheepDetails() {
  const { id } = useParams();
  const { sheep, error, isLoading } = useSheep(id);
  console.log(sheep);
  return (
    <div>
      <h1>Sheep Details</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {sheep && (
        <div>
          <p>Sheep ID: {sheep.id}</p>
          <p>Sheep Amount: {sheep.amount}</p>
          <p>Sheep Price: {sheep.price}</p>
          <p>Sheep Status: {sheep.status}</p>
          <p>Sheep Created At: {sheep.createdAt}</p>
        </div>
      )}
    </div>
  );
}

export default SheepDetails;
