import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPageContext,
} from "next";
import router, { useRouter } from "next/router";
import axiosInstance from "../../../lib/api/axios";
import useCampaign from "../../../lib/hooks/useCampaign";

function Campaign() {
  const route = useRouter();
  const { campaignID } = router.query;
  const { campaign, isLoading, error } = useCampaign(campaignID as string);
  return <div></div>;
}

export default Campaign;
