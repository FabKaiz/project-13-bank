// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3001/api/v1',
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userToken
        if (token) {
          // include auth token in the req header
          headers.set('authorization', `Bearer ${token}`)
          return headers
        }
      }
    }
  ),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'POST'
      })
    })
  })
})

export const { useGetUserDetailsQuery } = authApi