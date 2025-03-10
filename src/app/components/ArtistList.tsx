"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import Image from "next/image";
import getArtistList from "../helpers/getArtistList";

import { GridColDef } from "@mui/x-data-grid";
import { getFilterModelFromURL, updateURLParams } from "../helpers/handleURLParameter";
import { artistType, paginationType } from "../constants";
import filterArtists from "../helpers/filterArtists";

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

const emptyFilterModel = {
  items: []
}

export default function ArtistTable() {
    const [artistList, setArtistList] = useState<artistType[]>([])
    const [pagination, setPagination] = useState<paginationType>({} as paginationType)
    const [page, setPage] = useState<number>(pagination.current_page || 1);

    const [filteredData, setFilteredData] = useState<artistType[]>(artistList);
    const [filterModel, setFilterModel] = useState<GridFilterModel>(emptyFilterModel);

  useEffect(() => {
    const getData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const page = Number(queryParams.get("page")) || 1;

      const result = await getArtistList(page);
      const { data, pagination: paginationData = {} } = result || { data: [], pagination: {} };

      setArtistList(data || [])
      setPagination(paginationData || {})
    }

    getData()

    return () => {
      setArtistList([])
    }
  }, [page])

  useEffect(() => {
    const { field, value, operator } = getFilterModelFromURL();

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
    const filtered = filterArtists(artistList, filterModel)

    setFilteredData(filtered);
  }, [artistList, filterModel]);

  const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
    updateURLParams(newFilterModel, page);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURLParams(filterModel, newPage)
  };

  return (
      <Box sx={{ height: "max-content", width: "100%" }}>
         <DataGrid
          onFilterModelChange={(model) => handleFilterModelChange(model)}
          filterModel={filterModel}
          rows={filteredData}
          columns={columns}
          paginationModel={{ page: pagination.current_page - 1, pageSize: pagination.per_page }}
          pagination
          paginationMode="server"
          rowCount={pagination.total_items}
          pageSizeOptions={[50]}
          filterMode="server"
          onPaginationModelChange={(pageData: { page: number, pageSize: number}) => handlePageChange(pageData.page + 1)}
        /> 
      </Box>
  );
};