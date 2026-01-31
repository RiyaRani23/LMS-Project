import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/",
        method: "POST",
        body: { courseTitle, category },
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),

    getCreatorCourses: builder.query({
      query: () => "/",
      providesTags: ["Refetch_Creator_Course"],
    }),

    editCourse: builder.mutation({
      query: ({ courseId, formData }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Course", "Refetch_Creator_Course"],
    }),

    getCourseById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),

    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Lecture"],
    }),

    getCourseLectures: builder.query({
      query: (courseId) => `/${courseId}/lecture`,
      providesTags: ["Lecture"],
    }),

    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Lecture"],
    }),

    editLecture: builder.mutation({
      query: ({ courseId, lectureId, formData }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "PATCH",
        body: formData, 
      }),
      invalidatesTags: ["Lecture"],
    }),

    // courseApi.js
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture"], // This refreshes the list automatically
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} = courseApi;
