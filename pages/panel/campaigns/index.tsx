import { MouseEventHandler } from "react";
import CampaignsTBody from "../../../components/CampaignsTBody";
import Layout from "../../../components/Layout";
import Table from "../../../components/Table";
import useCampaigns from "../../../lib/hooks/useCampaigns";

function Index() {
  const { rows, headersMap } = useCampaigns();
  return (
    <Layout>
      <div className="bg-base h-screen">
        <Table rows={rows} headersMap={headersMap} Body={CampaignsTBody} />
      </div>
    </Layout>
  );
}

export default Index;
