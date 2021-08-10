import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";

function useCampaign(campaignID: string) {
  const { data, error, isLoading, isFetching } = useQuery("campaign", () => {
    axiosInstance
      .get(`/campaings/${campaignID}`)
      .then((res) => res.data.campaign);
  });
  const [campaignObj, setCampaignObj] = useState({
    campaign: {},
    error: "",
    isLoading: true,
  });
  useEffect(() => {
    let errorMsg = "";
    if (error) {
      axios.isAxiosError(error)
        ? error.response?.data.error
        : "An error happened while fetching the campaign";
    }
    setCampaignObj({
      campaign: data ? data : {},
      error: errorMsg,
      isLoading: isLoading || isFetching,
    });
  }, [data, error, isLoading, isFetching]);
  return campaignObj;
}

export default useCampaign;
