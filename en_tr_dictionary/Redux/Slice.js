import {createSlice} from "@reduxjs/toolkit";

const Slice = createSlice({
    name: "dictionary",
    initialState:{
        index: 0,
        dict:[
            {
                en: "Computer",
                tr: "Bilgisayar"
            },
            {
                en: "Surfing",
                tr: "Sörf yapmak"
            },
            {
                en: "Naturalness",
                tr: "Doğallık"
            },
            {
                en: "Programming",
                tr: "Programlama"
            },
            {
                en: "Software",
                tr: "Yazılım"
            },
            {
                en: "Data",
                tr: "Veri"
            }
        ]
    },
    reducers:{
        add(state, action){
            const word = action.payload;
            state.dict.push(word);
        },
        increase(state){
            state.index++
        },
        decrease(state){
            state.index--
        },
        indexReset(state){
            state.index = 0
        },
        indexFull(state, action){
            const index = action.payload.index;
            state.index = index;
        }
    }
});

export const {add, decrease, increase, indexReset, indexFull} = Slice.actions;
export default Slice;