import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types/RootState'
import { AppAsyncDispatch } from '../types/AppAsyncDispatch'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppAsyncDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
