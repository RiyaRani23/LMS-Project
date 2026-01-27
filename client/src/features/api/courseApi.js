import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course"

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes:['Refetch_Creator_Course'],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API, 
   credentials:"include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({courseTitle, category}) => ({
        url: "/",
        method: "POST",
        body: {courseTitle, category},
      }),
     providesTags:['Refetch_Creator_Course']
    }),

    getCreatorCourses: builder.query({
      query: () => "/",
       providesTags:['Refetch_Creator_Course'],
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