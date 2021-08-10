import { CampaignInterface, UseCampaignsInterface } from "../ts/interfaces";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function useCampaigns() {
  const headersMap = [
    { header: "ID", key: "_id" },
    { header: "Client", key: "client" },
    { header: "Pages", key: "pages" },
    { header: "Impressions", key: "impressions" },
    { header: "Leads", key: "leads" },
    { header: "Affiliates", key: "affiliates" },
    { header: "Price", key: "price" },
    { header: "Spend", key: "spend" },
  ];
  //header are in the same order as the keys in the rows object
  const [returnObj, setReturnObj] = useState<UseCampaignsInterface>({
    error: "",
    headersMap,
    isLoading: true,
    rows: [],
  });

  const {
    data: campaigns,
    error,
    isLoading,
    isFetching,
  } = useQuery("campaigns", () => {
    return axiosInstance
      .get("/campaigns")
      .then((res) => res.data.campaigns as CampaignInterface[]);
  });
  useEffect(() => {
    console.log("useCampaigns 37  :", campaigns, error, isLoading, isFetching);

    const errorMsg = error
      ? axios.isAxiosError(error)
        ? error.response?.data.error
        : ""
      : "";
    setReturnObj({
      error: errorMsg,
      rows: campaigns ? campaigns : [],
      headersMap,
      isLoading: isLoading || isFetching,
    });
  }, [campaigns, error, isLoading]);
  return returnObj;
}

export default useCampaigns;
