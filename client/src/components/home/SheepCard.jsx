export const SheepCard = ({ sheep }) => {
  const { number, categoryName, price, weight, age } = sheep;
  const ages = {
    LAMBS: "few Months",
    YEARLINGS: "1 | 2 ans",
    MATURE: " 3 | 4 ans",
    OLD: "+4 ans",
  };
  return (
    <div className=" bg-gradient-to-tl from-background-secondary to-background-primary rounded-md shadow-xl p-5 border-border border transform transition-all hover:scale-90">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Sheep #{number}
        </h2>
        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-semibold inline-block">
          {categoryName}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b  pb-2 group border-text-placeholder">
          <div className="flex items-center space-x-1">
            <span className="text-text-secondary group-hover:text-text-tertiary">
              Price
            </span>
          </div>
          <span className="text-lg font-bold text-text-primary group-hover:text-green-600">
            {price.toLocaleString()} Dh
          </span>
        </div>

        <div className="flex justify-between items-center border-b  pb-2 group border-text-placeholder">
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary group-hover:text-text-tertiary">
              Weight
            </span>
          </div>
          <span className="text-lg font-bold text-text-primary group-hover:text-blue-600">
            {weight} kg
          </span>
        </div>

        <div className="flex justify-between items-center group">
          <div className="flex items-center space-x-2">
            <span className="text-text-secondary group-hover:text-text-tertiary">
              Age
            </span>
          </div>
          <span className="text-lg font-bold text-text-primary group-hover:text-purple-600">
            {ages[age]}
          </span>
        </div>
      </div>
    </div>
  );
};
