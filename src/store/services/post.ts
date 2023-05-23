import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postApi = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  endpoints: (builder) => ({
    getPost: builder.query<IPost[], void>({
      query: () => "/",
      transformResponse: (response: IPost[]) => response.slice(0, 10),
    }),
    addPost: builder.mutation({
      query: (post: IPost) => ({
        url: "/",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const { useGetPostQuery } = postApi;
export const { useAddPostMutation } = postApi;
