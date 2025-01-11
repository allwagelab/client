import { type RouteObject, Navigate } from 'react-router-dom'

import { LayoutComponent } from '@/components'
import { PATH } from '@/data/path'
<<<<<<< HEAD
import { LoginPage } from '@/pages'
=======
import { FindIdPage, FindPasswordPage, LoginPage } from '@/pages'
>>>>>>> develop

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
<<<<<<< HEAD
=======
          path: PATH.findId,
          element: <FindIdPage />,
        },
        {
          path: PATH.findPassword,
          element: <FindPasswordPage />,
        },
        {
>>>>>>> develop
          path: '/',
          element: <Navigate to={PATH.login} replace />,
        },
      ],
    },
  ],
}
