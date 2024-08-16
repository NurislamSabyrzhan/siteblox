import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import axios from "axios"

export const Route = createRootRoute({
    component: () => <Index/>
})

function Index() {
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = "http://localhost:5000"

    return  <>
        <Outlet />
        <TanStackRouterDevtools />
    </>
}