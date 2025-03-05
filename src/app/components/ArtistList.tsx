import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import Image from "next/image";

type artistType = { id: number, name: string, albumCount: number, portrait: string}
type paginationType = {
  current_page: number,
  total_pages: number,
  per_page: number,
  total_items: number
}

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Név", width: 200 },
  { field: "albumCount", headerName: "Albumok száma", width: 120 },
  {
      field: "portrait",
      headerName: "Portré",
      width: 70,
      renderCell: (params: { value: string, row: { name: string}}) => (
          <Image
              src={params.value}
              alt={params.row.name}
              width={50}
              height={50}
          />
      )
  },
  {field: "type", headerName: "Előadó típus", width: 150}

];

export default function ArtistTable({artistList, pagination}:
   {artistList: artistType[], pagination: paginationType}) {
  const [filter, setFilter] = useState(artistList || []);
  const [page, setPage] = useState<number>(pagination.current_page || 0);
  const [perPage, setPerPage] = useState<number>(pagination.per_page || 0);
  const [totalItems, setTotalItems] = useState<number>(pagination.total_items || 0);
  const [filteredData, setFilteredData] = useState<artistType[]>(artistList);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: []
});

  useEffect(() => {
    setPage(pagination.current_page)
    setPerPage(pagination.per_page)
    setTotalItems(pagination.total_items)
    
  }, [artistList, pagination])
  

  useEffect(() => {
    setFilteredData(artistList);
  }, [filter, artistList]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const field = queryParams.get("field") || "";
    const operator = queryParams.get("operator") || "";
    const value = queryParams.get("filter") || "";
    if (value) {
      setFilterModel({
        items: [
          {
            field: field,
            operator: operator,
            value: value
          }
        ]
      });
      }
  }, []);

  useEffect(() => {
    const filterValue = filterModel.items.length
        ? filterModel.items[0].value
        : "";

    if (!filterValue) {
      return
    }

    const filtered = artistList.filter((artist) =>
        artist.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filtered);
}, [artistList, filterModel]);

  const updateURL = (filterModel: GridFilterModel) => {
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
    }
    window.history.pushState(null, "", `?${queryParams.toString()}`);
  };

  const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
    updateURL(newFilterModel);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          onFilterModelChange={(model) => handleFilterModelChange(model)}
          rows={filteredData}
          columns={columns}
          pageSize={perPage}
          rowsPerPageOptions={[50, 100, 200]}
          pagination
          paginationMode="server"
          onPageChange={(newPage: number) => handlePageChange(newPage + 1)}
          page={page - 1}
          rowCount={totalItems}
          onPageSizeChange={handleRowsPerPageChange}
        />
      </Box>
  );
};