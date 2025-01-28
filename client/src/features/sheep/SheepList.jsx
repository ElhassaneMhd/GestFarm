import { useEffect } from "react";
import { useSheep } from "./useSheep";
import { useUser } from "../../hooks/useUser";

export function SheepList() {
  const { sheep, error, isLoading } = useSheep();
  const { user } = useUser();


  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {user && <p>{user.username}</p>}
      {sheep && <p>{sheep.length} </p>}
    </div>
  );
}
