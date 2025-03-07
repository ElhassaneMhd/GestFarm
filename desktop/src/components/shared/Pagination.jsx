import { Button, DropDown } from "@/components/ui";

export function Pagination({
  totalItems,
  totalPages,
  page,
  limit,
  onChangeLimit,
  onPaginate,
  disabled,
  className = "",
}) {
  if (totalItems === 0 || disabled) return null;

  return (
    <div
      className={`relative z-10 flex flex-col justify-between gap-3 border-t border-border pt-2 sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex flex-1 flex-col items-center justify-between gap-3 mobile:flex-row">
        <div className="flex items-center gap-3">
          <Span>Rows per page :</Span>
          <DropDown
            toggler={
              <DropDown.Option
                size="small"
                className=" bg-background-secondary text-text-primary"
              >
                {limit}
              </DropDown.Option>
            }
          >
            {[1, 5, 10, 15, 20, 30].map((el) => (
              <DropDown.Option
                key={el}
                size="small"
                className="justify-center"
                isCurrent={el === limit}
                onClick={() => {
                  onPaginate(1);
                  onChangeLimit(el);
                }}
              >
                {el}
              </DropDown.Option>
            ))}
          </DropDown>
        </div>
      </div>
      <div className="flex justify-between gap-2 sm:justify-normal">
        <Button
          color="tertiary"
          type="outline"
          className="w-20"
          size="small"
          onClick={() => page !== 1 && onPaginate(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          color="tertiary"
          type="outline"
          className="w-20"
          size="small"
          onClick={() => page <= totalPages && onPaginate(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Span({ children, variable }) {
  return (
    <span
      className={`ml-1 text-center text-xs sm:text-start ${
        variable ? "font-semibold text-text-primary" : "text-text-tertiary"
      }`}
    >
      {children ? children : "-"}
    </span>
  );
}
