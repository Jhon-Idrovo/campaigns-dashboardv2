import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
import { clientsMapping } from "../display/headerToKeysMappings";
import { UseClientInteface } from "../ts/interfaces";

function useClients() {
  const baseClientObj = {
    error: "",
    isLoading: true,
    rows: [],
    headersMap: clientsMapping,
  } as UseClientInteface;
  const [clientsObj, setClientsObj] =
    useState<UseClientInteface>(baseClientObj);

  const {
    data: clients,
    error,
    isLoading,
    isFetching,
  } = useQuery("clients", () =>
    axiosInstance.get("/clients").then((res) => res.data.clients)
  );
  useEffect(() => {
    console.log(clients);

    let rows = [];
    let errorMsg = "";
    if (error) {
      errorMsg = axios.isAxiosError(error)
        ? (error.response?.data.error as string)
        : "";
    } else {
      rows = clients;
    }

    setClientsObj({
      ...baseClientObj,
      isLoading: isLoading || isFetching,
      error: errorMsg,
      rows,
    });
  }, [clients, isLoading, error]);
  return clientsObj;
}

export default useClients;
