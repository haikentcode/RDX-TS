import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
  cols?: number;
  rows?: number;
}

export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/photos",
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhoto[], void>({
      query: () => "/",
      transformResponse: (response: IPhoto[]) => response.slice(0, 100),
    }),
    addPhoto: builder.mutation({
      query: (post: IPhoto) => ({
        url: "/",
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const { useGetPhotosQuery } = photosApi;
export const { useAddPhotoMutation } = photosApi;
