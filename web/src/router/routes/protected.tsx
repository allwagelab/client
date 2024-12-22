import { type RouteObject, Navigate } from 'react-router-dom'

import { FindIdPage, FindPasswordPage, LoginPage } from '@/pages'
import { LayoutComponent } from '@/components'
import { PATH } from '@/data/path'

export const publicRoutes: RouteObject = {
  element: <LayoutComponent.Protected />,
  children: [
    {
      children: [
        {
          path: PATH.login,
          element: <LoginPage />,
        },
        {
          path: PATH.findId,
          element: <FindIdPage />,
        },
        {
          path: PATH.findPassword,
          element: <FindPasswordPage />,
        },
        {
          path: '/',
          element: <Navigate to={PATH.login} replace />,
        },
      ],
    },
  ],
}
