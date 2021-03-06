import TableBody from "../../../components/TableBody";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";
import useAffiliates from "../../../lib/hooks/useAffiliates";

function Index() {
  const { rows, headersMap, isLoading, error } = useAffiliates();
  return (
    <Layout>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <Table rows={rows} headersMap={headersMap} Body={TableBody} />
      )}
    </Layout>
  );
}

export default Index;
