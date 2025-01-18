import { useNavigate, useLocation } from 'react-router-dom'

import { URLS } from '@allwagelab/constants'
import { useAuth } from '@allwagelab/message-bus'

import { axiosPrivateInstance } from '@/apis'

const NAV_LIST = [
  {
    name: '홈',
    path: URLS.APP_HOME,
  },
  {
    name: '근무 관리',
    path: URLS.APP_SCHEDULE,
  },
  {
    name: '직원 관리',
    path: URLS.APP_EMPLOYEE,
  },
]

function Navigation() {
  const auth = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClickNavItem = (path: string) => {
    navigate(path)
  }

  const onClick = async () => {
    try {
      // const companyInfo = await axiosPrivateInstance.get('/company/info')
      // const employee = await axiosPrivateInstance.get(
      //   '/employee?isWorking=true&date=true&orderBy=name',
      // )
      // console.log(`employee: ${JSON.stringify(employee)}`)
      // console.log(`companyInfo: ${JSON.stringify(companyInfo)}`)

      const result = await Promise.race([
        axiosPrivateInstance.get('/company/info'),
        axiosPrivateInstance.get('/employee?isWorking=true&date=true&orderBy=name'),
      ])
      console.log(`result: ${JSON.stringify(result)}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside>
      <ul>
        {NAV_LIST.map(item => {
          const { name, path } = item
          return (
            <li
              key={path}
              className={pathname === path ? 'active' : ''}
              onClick={() => onClickNavItem(path)}
            >
              {name}
            </li>
          )
        })}
      </ul>
      <br />
      <button type="button" onClick={onClick}>
        api request(/w Auth)
      </button>
      <br />
      <span>auth: {JSON.stringify(auth)}</span>
    </aside>
  )
}

export default Navigation
