import { GetServerSidePropsContext } from "next";

function Client({ clientID }: { clientID: string }) {
  return <div></div>;
}

export default Client;
/**
 * necessary since the query object returned using
 * useRouter() is empty at first, which causes errors
 * on fetching.
 * @param context
 * @returns
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { clientID } = context.params as { clientID: string };
  return {
    props: { clientID }, // will be passed to the page component as props
  };
}
