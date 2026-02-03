import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/purchase",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Course", "CourseProgress"],
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout",
        method: "POST",
        body: { courseId },
      }),
    }),

    getCourseProgress: builder.query({
      query: (courseId) => `/course-progress/${courseId}`,
      providesTags: ["CourseProgress"],
    }),

    getCourseDetailWithPurchaseStatus: builder.query({
      query: (courseId) => `/course-detail/${courseId}`,
      providesTags: (result, error, courseId) => [
        { type: "Course", id: courseId },
      ],
    }),

    getAllPurchasedCourses: builder.query({
      query: () => "/",
    }),

    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/course-progress/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
      invalidatesTags: ["CourseProgress"],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetAllPurchasedCoursesQuery,
  useGetCourseProgressQuery,
  useGetCourseDetailWithPurchaseStatusQuery,
  useUpdateLectureProgressMutation,
} = purchaseApi;
