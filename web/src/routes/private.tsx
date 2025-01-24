import type { RouteObject } from 'react-router-dom'

import Employees from 'employee/Employees'
import HomeRoutes from 'home/HomeRoutes'
import ScheduleRoutes from 'schedule/ScheduleRoutes'

import { URLS } from '@allwagelab/constants'

import { LayoutComponent } from '@/components'

export const privateRoutes = (token: string | null): RouteObject => ({
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: URLS.APP_HOME + '/*',
          element: <HomeRoutes auth={token} />,
        },
        {
          path: URLS.APP_SCHEDULE + '/*',
          element: <ScheduleRoutes auth={token} />,
        },
        {
          path: URLS.APP_EMPLOYEE + '/*',
          element: <Employees auth={token} />,
        },
      ],
    },
  ],
})
