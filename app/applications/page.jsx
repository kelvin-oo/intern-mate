import Application from "./Application"
import { currentServerUser } from "@/lib/serverAuthState"
import { getApplications } from "@/actions/application"


async function page() {
  const user = await currentServerUser();
  const applications = await getApplications();
  // console.log(applications);

  return (
    <>
    <Application user={user} applications={applications}/>
    </>
  )
}


export default page
