import Application from "./Application"
import { currentServerUser } from "@/lib/serverAuthState"


async function page() {
  const user = await currentServerUser();

  return (
    <>
    <Application user={user} />
    </>
  )
}


export default page
