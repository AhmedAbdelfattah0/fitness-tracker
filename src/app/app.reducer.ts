import { ActionReducerMap ,createFeatureSelector,createSelector} from "@ngrx/store";
import * as formUi from "./sheard/ui.reducer";
import { state } from '@angular/animations';

export interface State {
    ui: formUi.State
}

export const reducers:ActionReducerMap<State>={
    ui: formUi.uiReducer
}

export const getUiState = createFeatureSelector<formUi.State>('ui');
export const getIsLoading = createSelector(getUiState,formUi.getIsLoading)