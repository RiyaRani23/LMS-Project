import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/purchase", 
    credentials:'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout",
        method: "POST",
        body: { courseId },
      }),
    }),
    
    getCourseStatus: builder.query({
      query: (courseId) => `/course-status/${courseId}`,
    }),

    // 3. Get all courses purchased by the user
    getAllPurchasedCourses: builder.query({
      query: () => "/",
    }),
  }),
});

export const { 
  useCreateCheckoutSessionMutation, 
  useGetCourseStatusQuery, 
  useGetAllPurchasedCoursesQuery 
} = purchaseApi;