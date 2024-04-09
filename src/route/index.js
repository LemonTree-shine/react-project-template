import React, { lazy, Suspense, useState } from "react";
export default [
    {
        path: '/index',
        component: lazy(() => import('@/page/index/index'))
    },
    {
        path: '/demo',
        component: lazy(() => import('@/page/demo/index'))
    }
]