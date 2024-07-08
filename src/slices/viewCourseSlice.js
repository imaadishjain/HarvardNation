import { createSlice } from "@reduxjs/toolkit";


const initialState={


     courseSectionData:[],
     courseEntireData:[],
     completedLectures:[],
     totalNumberOfLectures:0
}


const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseSectionData:(state,value)=>
            {
                 state.courseSectionData=value.payload;
            },
            setEntireCourseData:(state,value)=>
                {
                     state.courseEntireData=value.payload;
                },

                setTotalNumberOfLecture:(state,value)=>
                    {
                        state.totalNumberOfLectures=value.payload;
                    },


                setCompletedLecture:(state,value)=>
                    {
                        state.completedLectures=value.payload
                    },

                    updateCompletedLecture:(state,value)=>
                        {
                            state.completedLectures=[...state.completedLectures,value.payload]
                        }

    }

})

export const{
    setCourseSectionData,
    setEntireCourseData,
    setTotalNumberOfLecture,
    setCompletedLecture,
    updateCompletedLecture
}=viewCourseSlice.actions;


export default viewCourseSlice.reducer