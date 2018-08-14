/**
 * Created by wushuang on 2018/7/25.
 */
import React from 'react'
import {Route} from 'react-router-dom'
import Loadable from 'react-loadable';

const Loading = () => (
    <img src="../img/loading.gif"/>
);

//test
const Welcome = () => (
    <div>
        <h2>Welcome!</h2>
    </div>
);

const RouteWithSubRoutes = route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

// then our route config
const routes = [
    {
        exact: true,
        path: "/login",
        component: Loadable({
            loader: () => import('../container/LoginContainer'),
            loading: Loading
        }),
    },
    {
        path: "/",
        component: Loadable({
            loader: () => import('../container/AppContainer'),
            loading: Loading
        }),
        routes: [
            {
                exact: true,
                path: "/",
                component: Welcome
            },
            {
                exact: true,
                path: "/welcome",
                component: Welcome
            },
            {
                exact: true,
                path: "/diary",
                component: Loadable({
                    loader: () => import('../container/diary/DiaryMain'),
                    loading: Loading
                }),
            },
            {
                exact: true,
                path: "/dailyTask",
                component: Loadable({
                    loader: () => import('../container/dailyTask/DailyTaskMain'),
                    loading: Loading
                }),
            },
            {
                path: "/blog",
                component: Loadable({
                    loader: () => import('../container/CmnContainer'),
                    loading: Loading
                }),
                routes: [
                    {
                        path: "/blog/home",
                        component: Loadable({
                            loader: () => import('../container/blog/Blog'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/blog/admin",
                        component: Loadable({
                            loader: () => import('../container/blog/BlogAdmin'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/blog/new",
                        component: Loadable({
                            loader: () => import('../container/blog/BlogNew'),
                            loading: Loading
                        }),
                    }
                ]
            },
            {
                path: "/tools",
                component: Loadable({
                    loader: () => import('../container/tools/ToolsContainer'),
                    loading: Loading
                }),
                routes: [
                    {
                        path: "/tools/base64",
                        component: Loadable({
                            loader: () => import('../module/tools/Base64Encode'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/tools/simplePressureTest",
                        component: Loadable({
                            loader: () => import('../module/tools/SimplePressureTest'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/tools/jsonParser",
                        component: Loadable({
                            loader: () => import('../module/tools/JsonParser'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/tools/md5",
                        component: Loadable({
                            loader: () => import('../module/tools/Md5Encoder'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/tools/colorPicker",
                        component: Loadable({
                            loader: () => import('../module/tools/ColorPanel'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/tools/calendar",
                        component: Loadable({
                            loader: () => import('../module/tools/CalendarPanel'),
                            loading: Loading
                        }),
                    }
                ]
            },
            {
                path: "/task",
                component: Loadable({
                    loader: () => import('../container/CmnContainer'),
                    loading: Loading
                }),
                routes: [
                    {
                        path: "/task/home",
                        component: Loadable({
                            loader: () => import('../module/task/TaskHomePage'),
                            loading: Loading
                        }),
                    },
                    {
                        path: "/task/new",
                        component: Loadable({
                            loader: () => import('../module/task/TaskNew'),
                            loading: Loading
                        }),
                    }
                ]
            }
        ]
    },

];

export const noMatchRoute = {
    component: Loadable({
        loader: () => import('../container/NoMatch'),
        loading: Loading
    }),
};

module.exports = {routes, RouteWithSubRoutes, noMatchRoute};