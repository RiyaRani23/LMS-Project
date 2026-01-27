import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/course", // Ensure this matches your backend URL
    prepareHeaders: (headers) => {
      // Add any custom headers here if needed
      return headers;
    },
  }),
  tagTypes: ["Course"], // Tag for cache invalidation
  endpoints: (builder) => ({
    // 1. Create Course (POST)
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Course"], // Refetches courses list after adding a new one
    }),

    // 2. Get All Creator Courses (GET)
    getCreatorCourses: builder.query({
      query: () => "/",
      providesTags: ["Course"], // Sets up the cache
    }),

    // 3. Edit/Update Course (PUT)
    editCourse: builder.mutation({
      query: ({ courseId, categories }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: categories,
      }),
      invalidatesTags: ["Course"],
    }),

    // 4. Get Course By ID (GET)
    getCourseById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
  }),
});

// Auto-generated hooks based on the endpoints
export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
} = courseApi;