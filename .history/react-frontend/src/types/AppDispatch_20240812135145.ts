import store from "../redux/store";
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']