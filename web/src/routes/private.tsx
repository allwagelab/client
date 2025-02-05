import React from 'react'
import type { RouteObject } from 'react-router-dom'

import { URLS } from '@allwagelab/constants'

import { LayoutComponent } from '@/components'

const Home = React.lazy(() => import('home/HomeRoutes'))
const Employees = React.lazy(() => import('employee/Employees'))
const Schedule = React.lazy(() => import('schedule/ScheduleRoutes'))

export const privateRoutes = (token: string | null): RouteObject => ({
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: URLS.APP_HOME + '/*',
          element: <Home auth={token} />,
        },
        {
          path: URLS.APP_SCHEDULE + '/*',
          element: <Schedule auth={token} />,
        },
        {
          path: URLS.APP_EMPLOYEE + '/*',
          element: <Employees auth={token} />,
        },
      ],
    },
  ],
})
