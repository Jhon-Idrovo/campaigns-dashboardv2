import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
import { UseClientInteface } from "../ts/interfaces";

function useClients() {
  const baseClientObj = {
    error: "",
    isLoading: true,
    rows: [],
    headersMap: [
      { header: "ID", key: "_id" },
      { header: "Name", key: "name" },
      { header: "Type", key: "type" },
      { header: "Comments", key: "comments" },
    ],
  } as UseClientInteface;
  const [clientsObj, setClientsObj] =
    useState<UseClientInteface>(baseClientObj);

  const {
    data: clients,
    error,
    isLoading,
  } = useQuery("clients", () =>
    axiosInstance.get("/clients").then((res) => res.data)
  );
  useEffect(() => {
    let rows = [];
    let errorMsg = "";
    if (error) {
      errorMsg = axios.isAxiosError(error)
        ? (error.response?.data.error as string)
        : "";
    } else {
      rows = clients;
    }

    setClientsObj({ ...baseClientObj, isLoading, error: errorMsg, rows });
  }, [clients, isLoading, error]);
  return clientsObj;
}

export default useClients;
