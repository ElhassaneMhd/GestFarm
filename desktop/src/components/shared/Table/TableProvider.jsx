import { useState } from "react";
import { Table } from "./Table";
import { Search } from "./Search";
import { View } from "./View";
import { Pagination } from "./Pagination";
import { Download } from "./Download";
import { TableRecord } from "./TableRecord";
import { Actions } from "./Actions";
import { NewRecord } from "./NewRecord";
import { Selected } from "./Selected";
import { TableContext } from "./useTable";
import { useMethods } from "@/hooks/useMethods";

export function TableProvider({
  children,
  data,
  resourceName,
  isLoading,
  error,
  columns,
  // : tableColumns
  formFields,
  selectedOptions: defaultSelectedOptions,
  formDefaults,
  fieldsToSearch,
  defaultSortBy = "id",
  defaultDirection = "desc",
  downloadOptions,
}) {
  const [hiddenColumns, setHiddenColumns] = useState(
    columns.filter((c) => !c.visible).map((c) => c.displayLabel)
  );
  const [selected, setSelected] = useState([]);
  const [formOptions, setFormOptions] = useState({
    defaultValues: formDefaults,
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    gridLayout: true,
    submitButtonText: "",
    heading: "",
    isOpen: false,
    type: "create",
  });
  const [selectedOptions, setSelectedOptions] = useState({
    isOpen: false,
    actions: defaultSelectedOptions?.actions || [],
    deleteOptions: defaultSelectedOptions?.deleteOptions,
  });
  const {
    query,
    page,
    limit,
    sortBy,
    direction,

    onSearch,
    onPaginate,
    onChangeLimit,
    onSort,

    appliedFiltersNumber,
  } = useMethods({
    defaultSortBy,
    defaultDirection,
  });

  // Variables
  const rows = data?.data
    ?.search(query, fieldsToSearch)
    .customSort(sortBy, direction, columns);

  const totalItems = data?.total;
  const totalPages = Math.ceil(totalItems / limit);

  const excludedFields = columns
    .filter((c) => hiddenColumns.includes(c.displayLabel))
    .map((c) => c.displayLabel);

  const pdfConfig = {
    filename: downloadOptions?.pdfFileName || resourceName,
    tableHeaders: columns
      .map((c) => c.displayLabel)
      .filter((c) => !excludedFields.includes(c)),
  };

  const confirmOptions = {
    message: `Are you sure you want to delete this ${resourceName.toLowerCase()} ?`,
    title: `Delete ${resourceName}`,
    confirmText: "Delete",
  };

  // Handlers

  const onChangeView = (column, showAll) => {
    if (showAll) return setHiddenColumns([]);
    setHiddenColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column]
    );
  };

  const showForm = (options) => {
    setFormOptions((prev) => ({
      ...prev,
      ...options,
      close: () => {
        setFormOptions((prev) => ({
          ...prev,
          isOpen: false,
          defaultValues: formDefaults,
          heading: "",
          submitButtonText: "",
        }));
      },
    }));
  };

  const onSelect = (id, isAll) => {
    setSelected((prev) => {
      const selected = prev.includes(id)
        ? isAll
          ? prev
          : prev.filter((s) => s !== id)
        : [...prev, id];
      setSelectedOptions((prev) => ({
        ...prev,
        isOpen: selected.length > 0,
        onClose: () => setSelectedOptions((p) => ({ ...p, isOpen: false })),
      }));
      return selected;
    });
  };
  // Context value
  const context = {
    // data
    data: data?.data,
    resourceName,
    isLoading,
    error,
    // table
    columns,
    rows,
    hiddenColumns,
    disabled:
      isLoading ||
      error ||
      data?.data?.length === 0 ||
      (data?.page > totalPages && !query && !appliedFiltersNumber("all")),
    // Selection
    selected,
    isSelecting: selected.length > 0,
    selectedOptions,
    onSelect,
    // search
    query,
    onSearch,
    // pagination
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
    onPaginate,
    // view
    onChangeView,
    // sort
    sortBy,
    direction,
    onSort: (column, direction) => onSort(column, direction),
    // download
    pdfConfig,
    // other
    formOptions,
    formFields,
    showForm,
    confirmOptions,
  };

  return (
    <TableContext.Provider value={context}>{children}</TableContext.Provider>
  );
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.TableRecord = TableRecord;
TableProvider.Actions = Actions;
TableProvider.Selected = Selected;
