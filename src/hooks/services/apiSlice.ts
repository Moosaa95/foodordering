import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'

import { Mutex } from 'async-mutex'
import { useAuth0 } from '@auth0/auth0-react';


function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}





const mutex = new Mutex()

const API_BASE_URL = import.meta.env.VITE_NEXT_PUBLIC_HOST
console.log(API_BASE_URL, '==========checking base url');

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_BASE_URL}`,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      const csrftoken = getCookie('csrftoken');
      if (csrftoken) {
          headers.set('X-CSRFToken', csrftoken);
          
      }
      try {
        const {getAccessTokenSilently} = useAuth0()
        
        const accessToken = await getAccessTokenSilently()
        console.log('get header token', accessToken);

        if (accessToken){
          headers.set('Authorization', `Bearer ${accessToken}`)
        }

      }catch (err){
        console.error('failed to get auth0 access token');
        
      }
      return headers;
  },
})



const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          {
            url: '/jwt/refreshToken',
            method: 'POST'
          },
          api,
          extraOptions
        )
        if (refreshResult.data) {
        //   api.dispatch(tokenReceived(refreshResult.data))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
        //   api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})