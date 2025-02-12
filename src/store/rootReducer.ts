import { combineSlices } from "@reduxjs/toolkit";
import { iniSlice } from "@/store/slises/Ini/iniSlice";

const rootReducer = combineSlices(iniSlice);

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
