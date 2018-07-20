/**
 * Created by wushuang on 2018/7/20.
 */
import React from 'react'
import Loadable from 'react-loadable';
import HomePage from '../container/HomePage'
import Test1 from '../container/Test1'
import Test2 from '../container/Test2'
import Test11 from '../container/Test11'
import Test12 from '../container/Test12'

const Loading = () => null;

const routes = [
    {
        exact: true,
        path: "/",
        component: Loadable({
            loader: () => import('../container/Test2'),
            loading: Loading,
        }),
    },
    {
        path: "/t1",
        component: Loadable({
            loader: () => import('../container/Test1'),
            loading: Loading,
        }),
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
        component: Loadable({
            loader: () => import('../container/Test2'),
            loading: Loading,
        }),
    }
];

export default routes