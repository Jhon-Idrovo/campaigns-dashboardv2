import { AffiliateInterface, UseAffiliatesInterface } from "../ts/interfaces";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
import { useState, useEffect } from "react";
import axios from "axios";
import { affiliatesMapping } from "../display/headerToKeysMappings";

function useAffiliates() {
  const baseObj = {
    error: "",
    headersMap: affiliatesMapping,
    isLoading: true,
    rows: [],
  };
  const [affiliatesObj, setAffiliatesObj] =
    useState<UseAffiliatesInterface>(baseObj);
  const {
    error,
    data: affiliates,
    isLoading,
    isFetching,
  } = useQuery("affiliates", () =>
    axiosInstance.get("/affiliates").then((res) => res.data.affiliates)
  );
  useEffect(() => {
    console.log(error, affiliates, isLoading);

    let rows = [];
    let errorMsg = "";
    if (error) {
      errorMsg = axios.isAxiosError(error)
        ? (error.response?.data.error as string)
        : "";
    } else {
      rows = affiliates;
    }

    setAffiliatesObj({
      ...baseObj,
      isLoading: isLoading || isFetching,
      error: errorMsg,
      rows,
    });
  }, [error, isLoading, affiliates]);
  return affiliatesObj;
}

export default useAffiliates;
