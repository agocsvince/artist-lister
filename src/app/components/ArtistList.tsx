"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import Image from "next/image";
import getArtistList from "../helpers/getArtistList";

type artistType = { id: number, name: string, albumCount: number, portrait: string}
type paginationType = {
  current_page: number,
  total_pages: number,
  per_page: number,
  total_items: number
}

import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef<artistType>[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Név", width: 200 },
  { field: "albumCount", headerName: "Albumok száma", width: 120 },
  {
      field: "portrait",
      headerName: "Portré",
      width: 70,
      renderCell: (params) => (
          <Image
              src={params.value}
              alt={params.row.name}
              width={50}
              height={50}
          />
      )
  }
];

export default function ArtistTable() {
    const [artistList, setArtistList] = useState<artistType[]>([])
    const [pagination, setPagination] = useState<paginationType>({} as paginationType)
    const [page, setPage] = useState<number>(pagination.current_page || 1);

    const [filteredData, setFilteredData] = useState<artistType[]>(artistList);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
      items: []
  });


  useEffect(() => {
    const getData = async () => {
      const result = await getArtistList(page);
      const { data, pagination: paginationData = {} } = result || { data: [], pagination: {} };

      setArtistList(data || [])
      setPagination(paginationData || {})
    }

    getData()
    console.log(page)

    return () => {
      setArtistList([])
    }
  }, [page])

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
      setFilteredData(artistList)
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

  return (
      <Box sx={{ height: "max-content", width: "100%" }}>
        {artistList.length ? <DataGrid
          onFilterModelChange={(model) => handleFilterModelChange(model)}
          filterModel={filterModel}
          rows={filteredData}
          columns={columns}
          paginationModel={{ page: pagination.current_page - 1, pageSize: pagination.per_page }}
          pagination
          paginationMode="server"
          pageSizeOptions={[50]}
          rowCount={pagination.total_items}
          onPaginationModelChange={(pageData: { page: number, pageSize: number}) => handlePageChange(pageData.page + 1)}
        /> : <span className="flex justify-center items-center w-full h-full text-black">No data available</span>}
      </Box>
  );
};