import {createRouter, createWebHashHistory} from "vue-router";

import Login from "@/components/Login";
import PowerUsage from "@/components/pages/PowerUsage";
import ManagerDashboard from "@/components/manager/ManagerDashboard";
import ManagerOperator from "@/components/manager/ManagerOperatorTable";
import ManagerShips from "@/components/manager/ManagerShipTable";
import ShipsTable from "@/components/pages/ShipInformation";
import Dashboard from "@/components/pages/Dashboard";
import NotificationOverview from "@/components/pages/NotificationOverview";
import Alarms from "@/components/pages/Alarms";
import Map from "@/components/ship/Map";
import AdminTable from "@/components/admin/adminTable";
import Profile from "@/components/Profile/Profile";
import Personal from "@/components/Profile/Personal";
import Ship from "@/components/Profile/Ship";
import ChangePassword from "@/components/pages/ChangePassword";

const routes = [
    {path: "/",
        component: Login},
    {
        path: "/dashboard",
        component: Dashboard,
        children: [
            {
                path: "/ship-overview",
                component: ShipsTable,
                props: true
            },
            {
                path: "/power-usage",
                component: PowerUsage,
                props: true
            }, {
                path: "/admin",
                component: AdminTable,
                props: true
            },
            {
                path: "/manager", component: ManagerDashboard,
                children: [
                    {path: "/manager/operators", component: ManagerOperator},
                    {path: "/manager/ships", component: ManagerShips}
                ]
            },
            {
                path: "/notification-overview",
                component: NotificationOverview,
                props: true
            },
            {
                path: "/alarms",
                component: Alarms,
                props: true
            },
            {
                path: "/map",
                component: Map,
                props: true
            },
            {
                path: "/profile", component: Profile,
                children: [
                    {path: "/profile/personal", component: Personal},
                    {path: "/profile/ship", component: Ship}
                ]
            }
        ]
    },
    {
        path: "/changePassword",
        component: ChangePassword,
        props: true,
        query: true,
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/changePassword'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/');
    } else {
        next();
    }
});
