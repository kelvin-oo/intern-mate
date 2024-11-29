'use client'
import { currentClientUser } from "@/helpers/current-client-user"

import { LogoutButton } from "@/components/LogoutButton"
function page() {
    const user = currentClientUser()
  return (
    <div>
        <h1>name {user?.name}</h1>
        <h1>last name {user?.email}</h1>
        <h1>role {user?.role}</h1>
        <h1>id {user?.id}</h1>
        <LogoutButton>
        <h1>Log out</h1>
       </LogoutButton>
    </div>
  )
}

export default page