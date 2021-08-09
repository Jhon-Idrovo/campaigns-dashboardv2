interface BaseUseInterface {
  headersMap: HeaderMappingInterface[];
  isLoading: boolean;
  error: string;
}
export declare interface ClientInterface {
  id: number;
  name: string;
  type: string;
  comments: string;
}
export declare interface UseClientInteface extends BaseUseInterface {
  rows: ClientInterface[];
}

export declare interface CampaignInterface {
  id: number;
  pages: number;
  impressions: number;
  leads: number;
  affiliates: string[];
  price: number;
  spend: number;
}

export declare interface UseCampaignsInterface extends BaseUseInterface {
  rows: CampaignInterface[];
}

export declare interface AffiliateInterface {
  id: number;
  campaigns: string[];
  paid: number;
  reach: number;
  comments: string;
}
export declare interface UseAffiliatesInterface extends BaseUseInterface {
  rows: AffiliateInterface[];
}
export declare interface HeaderMappingInterface {
  header: string;
  key: string;
}
export declare interface TablePropsInterface {
  headersMap: HeaderMappingInterface[];
  rows: (AffiliateInterface | CampaignInterface | ClientInterface)[];
  Body: Function;
}
