import {useSelector, useDispatch} from "react-redux"
import { TypedUseSelectorHook } from "react-redux"
import { AppDispatch, RootState } from "./app/store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector