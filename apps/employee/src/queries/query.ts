import { useEffect } from 'react'

import {
  useQuery,
  QueryKey,
  useMutation,
  type QueryFunction,
  type UseQueryOptions,
  type MutationFunction,
  type UseMutationOptions,
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { base } from '@/apis'
import { AuthQuery } from '@/queries'
import { useAuthStore } from '@/stores/auth'

function useAuthQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
) {
  const { token } = useAuthStore(state => state)
  const { mutate, status } = AuthQuery.useRefreshToken()

  console.log('token:', token)

  if (token) {
    base.defaults.headers.common['authorization'] = `Bearer ${token}`
  }

  const enabled = options?.enabled === undefined ? true : options.enabled
  const { refetch, ...rest } = useQuery(queryKey, queryFn, {
    ...options,
    enabled: enabled && !!token,
    onError(err) {
      if ((err as AxiosError)?.response?.status === 401 && token) {
        mutate()
      }

      options?.onError?.(err)
    },
  })

  useEffect(() => {
    if (status === 'success') {
      refetch()
    }
  }, [status])

  return { refetch, ...rest }
}

function useAuthMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >,
) {
  const { token } = useAuthStore(state => state)
  if (token) {
    base.defaults.headers.common['authorization'] = `Bearer ${token}`
  }

  return useMutation(mutationFn, options)
}

export * from '@tanstack/react-query'
export { useAuthQuery, useAuthMutation }
