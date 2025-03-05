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
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState<number>(pagination.current_page || 0);
  const [perPage, setPerPage] = useState<number>(pagination.per_page || 0);
  const [totalItems, setTotalItems] = useState<number>(pagination.total_items || 0);
  const [filteredData, setFilteredData] = useState<artistType[]>(artistList);

  useEffect(() => {
    setPage(pagination.current_page)
    setPerPage(pagination.per_page)
    setTotalItems(pagination.total_items)
    
  }, [artistList, pagination])
  

  useEffect(() => {
    const filtered = artistList.filter((artist) =>
        artist.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredData(filtered);
  }, [filter, artistList]);

  const handleFilterChange = (model: GridFilterModel) => {
    console.log(model)
  }

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
          onFilterModelChange={(model) => handleFilterChange(model)}
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