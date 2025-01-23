import { useNavigate, useLocation } from 'react-router-dom'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { URLS } from '@allwagelab/constants'

import { base } from '@/apis/axios'

const NAV_LIST = [
  [
    {
      name: '프로필',
      path: '',
      icon: '/icons/user.svg',
      alt: 'user icon',
    },
    {
      name: '알림',
      path: '',
      icon: '/icons/alarm.svg',
      alt: 'alarm icon',
    },
  ],
  [
    {
      name: '홈',
      path: URLS.APP_HOME,
      icon: '/icons/home.svg',
      alt: 'home icon',
    },
    {
      name: '근무 관리',
      path: URLS.APP_SCHEDULE,
      icon: '/icons/calendar.svg',
      alt: 'calendar icon',
    },
    {
      name: '직원 관리',
      path: URLS.APP_EMPLOYEE,
      icon: '/icons/employee.svg',
      alt: 'employee icon',
    },
    {
      name: '급여 관리',
      path: '',
      icon: '/icons/receipt.svg',
      alt: 'receipt icon',
    },
    {
      name: '사업장 관리',
      path: '',
      icon: '/icons/building.svg',
      alt: 'building icon',
    },
  ],
  [
    {
      name: '결제 관리',
      path: '',
      icon: '/icons/card.svg',
      alt: 'card icon',
    },
    {
      name: '고객센터',
      path: '',
      icon: '/icons/headphone.svg',
      alt: 'headphone icon',
    },
  ],
]

function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClick = async () => {
    try {
      const response = await base.get('/company/info')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Sidebar>
      <img src="/logo.svg" alt="Allwage Logo" />
      <BusinessInfo>
        <div>사업장 이름</div>
        <div> 사원수 00명</div>
      </BusinessInfo>
      <MenuGroup>
        {NAV_LIST.map((item, index) => (
          <>
            <div key={index}>
              {item.map(({ name, path, icon, alt }) => (
                <div
                  key={name}
                  className={pathname === path ? 'active' : ''}
                  onClick={() => navigate(path)}
                >
                  <img src={icon} alt={alt} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <Divider />
          </>
        ))}
      </MenuGroup>
      <br />
      <button type="button" onClick={onClick}>
        api request(/w Auth)
      </button>
    </Sidebar>
  )
}

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  height: 100%;
  width: 20%;
  min-width: 260px;
  padding: 32px 36px;

  ${({ theme }) => css`
    border-right: solid 1px ${theme.colors.gray20};

    ${theme.typography.body.b1_rg}
    color: ${theme.colors.gray80};
  `}
`

const BusinessInfo = styled.div`
  margin-top: 52px;
  margin-left: 60px;
  margin-bottom: 24px;
  ${({ theme }) => css`
    color: ${theme.colors.baseBlack};

    & > div:first-of-type {
      ${theme.typography.body.b2_rg}
    }
    & > div:last-child {
      font-weight: 600;
    }
  `}
`

const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  & > div:last-child {
    display: none;
  }

  & > div > div {
    display: flex;
    align-items: center;
    height: 46px;
    padding: 8px;
    gap: 12px;
    cursor: pointer;
  }

  & > div > div.active {
    ${({ theme }) => css`
      color: ${theme.colors.blue60};
      font-weight: 600;
    `}
  }
`

const Divider = styled.div`
  ${({ theme }) => css`
    border-bottom: solid 1px ${theme.colors.gray30};
  `}
`

export default Navigation
