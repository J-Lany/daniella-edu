import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../types/RootState'
import { AppThunk } from '../types/AppThunk'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppThunk>()
export const useAppSelector = useSelector.withTypes<RootState>()
