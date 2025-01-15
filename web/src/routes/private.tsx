import type { RouteObject } from 'react-router-dom'

import EmployeeRoutes from 'employee/EmployeeRoutes'
import HomeRoutes from 'home/HomeRoutes'
import ScheduleRoutes from 'schedule/ScheduleRoutes'

import { URLS } from '@allwagelab/constants'
import type { AuthState } from '@allwagelab/schemas'

import { LayoutComponent } from '@/components'

export const privateRoutes = (auth: AuthState): RouteObject => ({
  element: <LayoutComponent.Private />,
  children: [
    {
      children: [
        {
          path: URLS.APP_HOME + '/*',
          element: <HomeRoutes auth={auth} />,
        },
        {
          path: URLS.APP_SCHEDULE + '/*',
          element: <ScheduleRoutes auth={auth} />,
        },
        {
          path: URLS.APP_EMPLOYEE + '/*',
          element: <EmployeeRoutes auth={auth} />,
        },
      ],
    },
  ],
})
