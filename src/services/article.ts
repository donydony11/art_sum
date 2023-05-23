import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

declare global {
    interface Window {
      env: {
        VITE_RAPID_API_ARTICLE_KEY?: string;
      };
    }
  }
  
  const rapidApiKey = window.env.VITE_RAPID_API_ARTICLE_KEY || '';
  
  export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
      prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', rapidApiKey );
        headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com' );
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getSummary: builder.query({
        query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
      }),
    }),
  });
  
  export const { useLazyGetSummaryQuery } = articleApi;