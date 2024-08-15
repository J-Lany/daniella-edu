import { ThunkAction } from 'redux-thunk'
import { UnknownAction } from 'redux'
import { RootState } from './RootState'

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>