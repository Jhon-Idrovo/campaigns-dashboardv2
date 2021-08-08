import { AffiliateInterface } from "../ts/interfaces";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
function useAffiliates() {
  const { isError, error, data, isLoading } = useQuery("affiliates", () =>
    axiosInstance.get("/affiliates", {}).then((res) => res.data)
  );
  return data.affiliates as AffiliateInterface[]
  return [
    {
      id: 2,
      campaigns: ["cladj", "ljldk"],
      paid: 150,
      reach: 500,
      //comments is an array of comments
      comments: "kljlkjl",
    },
  ] as AffiliateInterface[];
}

export default useAffiliates;
