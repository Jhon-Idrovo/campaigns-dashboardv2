import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPageContext,
} from "next";
import router, { useRouter } from "next/router";

function Campaign() {
  const route = useRouter();
  const { campaignId } = router.query;
  return <div></div>;
}

export default Campaign;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { campaignId } = context.params;

  return {
    props: {}, // will be passed to the page component as props
  };
}
