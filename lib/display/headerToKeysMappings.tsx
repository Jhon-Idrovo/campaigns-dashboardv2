import { HeaderMappingInterface } from "../ts/interfaces";

export let campaignsMapping: HeaderMappingInterface[] = [
  { header: "ID", key: "_id" },
  { header: "Pages", key: "pages" },
  { header: "Impressions", key: "impressions" },
  { header: "Leads", key: "leads" },
  { header: "Price", key: "price" },
  { header: "Spend", key: "spend" },
  { header: "Client", key: "client" },
  { header: "Affiliates", key: "affiliates" },
];

export let affiliatesMapping = [
  { header: "ID", key: "_id" },
  { header: "Paid", key: "paid" },
  { header: "Reach", key: "reach" },
  { header: "Comments", key: "comments" },
  { header: "Campaigns", key: "campaigns" },
];
export let clientsMapping = [
  { header: "ID", key: "_id" },
  { header: "Name", key: "name" },
  { header: "Type", key: "type" },
  { header: "Comments", key: "comments" },
];
