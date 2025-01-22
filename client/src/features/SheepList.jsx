import { useSheep } from "./useSheep";

export function SheepList() {
  const { sheep, error, isLoading } = useSheep();
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {sheep && (
        <ul>
          {sheep.map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
