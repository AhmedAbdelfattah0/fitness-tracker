import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as formUi from "./sheard/ui.reducer";
import * as formAuth from "./auth/auth.reducer";
export interface State {
    ui: formUi.State,
    auth: formAuth.State
}

export const reducers: ActionReducerMap<State> = {
    ui: formUi.uiReducer,
    auth: formAuth.authReducer
}

export const getUiState = createFeatureSelector<formUi.State>('ui');
export const getAuthState = createFeatureSelector<formAuth.State>('auth');

export const getIsLoading = createSelector(getUiState, formUi.getIsLoading);
export const getIsAuth = createSelector(getAuthState, formAuth.getIsAuth);