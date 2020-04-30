import { TrainingActions, SET_FINISHED_TRAINING, SET_AVAILABLE_TRAINING, START_TRAINING, STOP_TRAINING } from "./training.action";
import { Exercise } from './exercise.model';
import * as formRoot from '../app.reducer'
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise

}

export interface State extends formRoot.State {
    training: TrainingState
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}


export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAINING:
            return {
                ...state,
                availableExercises: action.payload
            };

        case SET_FINISHED_TRAINING:
            return {
                ...state,

                finishedExercises: action.payload
            };

        case START_TRAINING:
            return {
                ...state,
                activeTraining: {...state.availableExercises.find(
                    ex => ex.id === action.payload
                  )}
            };

        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };

        default:
            return state;
    }

}

export const getTrainingState = createFeatureSelector<TrainingState>('training');



export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTrainings = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining !==null);
