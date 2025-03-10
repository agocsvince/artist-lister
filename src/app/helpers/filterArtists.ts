import { GridFilterItem, GridFilterModel } from "@mui/x-data-grid";
import { artistType } from "../types";

const filterArtists = (artistList: artistType[], filterModel: GridFilterModel) => {
  let value = filterModel.items.length
        ? filterModel.items[0].value
        : '';

  const {field, operator}: GridFilterItem = filterModel.items.length
  ? filterModel.items[0]
  : {} as GridFilterItem;

  if (!value || !field || !operator) {
    return artistList
  }

  return artistList.filter((artist) => {

    if (!isNaN(Number(value))) {
      value = Number(value);
    }

    const itemValue = artist[field as keyof artistType];

    switch (operator) {
      case "equals":
        return itemValue === value;
      case "doesNotEqual":
        return itemValue !== value;
      case "contains":
        return typeof itemValue === "string" && itemValue.toLowerCase().includes(value.toLowerCase());
      case "doesNotContain":
        return typeof itemValue === "string" && !itemValue.toLowerCase().includes(value.toLowerCase());
      case "startsWith":
        return typeof itemValue === "string" && itemValue.toLowerCase().startsWith(value.toLowerCase());
      case "endsWith":
        return typeof itemValue === "string" && itemValue.toLowerCase().endsWith(value.toLowerCase());
      default:
        return true;
    }
  }
  );
}


export default filterArtists