import { UnknownAction } from 'redux'
import { RootState } from './RootState'
import { ThunkAction } from 'redux-thunk'

export type AppAsyncDispatch = ThunkAction<void, RootState, unknown, UnknownAction>