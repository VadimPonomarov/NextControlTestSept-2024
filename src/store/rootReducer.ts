import { combineSlices } from "@reduxjs/toolkit";

const rootReducer = combineSlices();

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
