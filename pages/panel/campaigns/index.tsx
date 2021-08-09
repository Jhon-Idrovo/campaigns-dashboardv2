import { MouseEventHandler } from "react";
import CampaignsTBody from "../../../components/CampaignsTBody";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";
import useCampaigns from "../../../lib/hooks/useCampaigns";

function Index() {
  const { rows, headersMap, isLoading, error } = useCampaigns();
  return (
    <Layout>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Table rows={rows} headersMap={headersMap} Body={CampaignsTBody} />
      )}
    </Layout>
  );
}

export default Index;
