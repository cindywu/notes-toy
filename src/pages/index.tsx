function Page() {
  return "";
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `/notes`,
      permanent: false,
    },
  };
}

export default Page;

