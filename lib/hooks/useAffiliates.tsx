import { AffiliateInterface } from "../ts/interfaces";

function useAffiliates() {
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
