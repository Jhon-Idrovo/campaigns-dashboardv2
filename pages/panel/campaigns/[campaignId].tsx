import { GetServerSidePropsContext } from "next";
import Error from "../../../components/Error";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";
import TableBody from "../../../components/TableBody";
import {
  affiliatesMapping,
  campaignsMapping,
} from "../../../lib/display/headerToKeysMappings";
import useCampaign from "../../../lib/hooks/useCampaign";

function Campaign({ campaignID }: { campaignID: string }) {
  console.log(campaignID);

  const { campaign, isLoading, error } = useCampaign(campaignID as string);
  if (isLoading) return <Loading />;
  if (error) return <Error></Error>;
  if (campaign) {
    return (
      <div className="">
        {campaignsMapping.map(({ header, key }) =>
          key === "client" || "affiliates" ? (
            <Table
              rows={key === "client" ? [campaign.client] : campaign.affiliates}
              headersMap={
                key === "client" ? campaignsMapping : affiliatesMapping
              }
              Body={TableBody}
            ></Table>
          ) : (
            <div className="flex" key={key}>
              <h6>{header}</h6>
              <p>{campaign[key]}</p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default Campaign;
/**
 * necessary since the query object returned using
 * useRouter() is empty at first, which causes errors
 * on fetching.
 * @param context
 * @returns
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { campaignID } = context.params as { campaignID: string };
  return {
    props: { campaignID }, // will be passed to the page component as props
  };
}
