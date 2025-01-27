import { getInternships } from "@/actions/intership";
import Internships from "./Internships";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query"

export default async function InternshipsPage() {
    const internships = await getInternships();
    // console.log(JSON.stringify(internships, null, 2));
    const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['interships'],
    queryFn: async () => {
      const result = await getInternships();
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Internships internships={internships} />
    </HydrationBoundary>
  )
}
