import { GridFilterModel } from "@mui/x-data-grid";

const updateURLParams = (filterModel: GridFilterModel, page: number) => {
  const queryParams = new URLSearchParams(window.location.search);
  if (filterModel.items.length > 0) {
      const { field, operator, value } = filterModel.items[0];
      queryParams.set("filter", value);
      queryParams.set("field", field);
      queryParams.set("operator", operator);
  } else {
      queryParams.delete("filter");
      queryParams.delete("field");
      queryParams.delete("operator");
      queryParams.delete("page");
  }
  queryParams.set("page", page.toString());

  window.history.pushState(null, "", `?${queryParams.toString()}`);
};

const getFilterModelFromURL = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const field = queryParams.get("field") || "";
  const operator = queryParams.get("operator") || "";
  const value = queryParams.get("filter") || "";

  return { field, value, operator};
}

export { updateURLParams, getFilterModelFromURL }