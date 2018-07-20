/**
 * Created by wushuang on 2018/7/20.
 */
import React from 'react'
import Loadable from 'react-loadable';
import HomePage from '../container/HomePage'
import Test1 from '../container/Test1'
import Test2 from '../container/Test2'

const Loading = () => null;

const routes = [
    {
        exact: true,
        path: "/",
        component: HomePage,
    },
    {
        path: "/t1",
        component: Test1,
        routes: [
            {
                path: "/t1/1",
                component: Loadable({
                    loader: () => import('../container/Test11'),
                    loading: Loading,
                }),
            },
            {
                path: "/t1/2",
                component: Loadable({
                    loader: () => import('../container/Test12'),
                    loading: Loading,
                }),
            }
        ]
    },
    {
        path: "/t2",
        component: Test2,
    }
];

export default routes