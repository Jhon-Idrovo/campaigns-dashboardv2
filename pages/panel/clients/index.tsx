import TableBody from "../../../components/TableBody";
import Error from "../../../components/Error";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";
import useClients from "../../../lib/hooks/useClients";

function Index() {
  const { rows, headersMap, isLoading, error } = useClients();
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
