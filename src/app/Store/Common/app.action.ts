import { createAction, props } from "@ngrx/store";

export const SHOW_ALERT = '[app]show alert';
export const EMPY_ACTION = '[app]empty'

export const showAlert = createAction(SHOW_ALERT, props<{message:string, resultType: string}>())
export const emptyAction = createAction(EMPY_ACTION)