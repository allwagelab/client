import { type RouteObject, Navigate } from 'react-router-dom'

import { URLS } from '@allwagelab/constants'

import { LayoutComponent } from '@/components'
import { HOST_APP_PROTECTED_URLS } from '@/data/path'
import { FindIdPage, FindPasswordPage, LoginPage } from '@/pages'

export const protectedRoutes: RouteObject = {
  element: <LayoutComponent.Protected />,
  children: [
    {
      children: [
        {
          path: URLS.APP_LOGIN,
          element: <LoginPage />,
        },
        {
          path: HOST_APP_PROTECTED_URLS.FIND_ID,
          element: <FindIdPage />,
        },
        {
          path: HOST_APP_PROTECTED_URLS.FIND_PASSWORD,
          element: <FindPasswordPage />,
        },
        {
          path: URLS.APP_START,
          element: <Navigate to={URLS.APP_LOGIN} replace />,
        },
      ],
    },
  ],
}
