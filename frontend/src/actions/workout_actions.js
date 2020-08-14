// workout_actions.js

//util imports 

import {getWorkouts, getUserWorkouts, createUserWorkout, deleteWorkout, updateWorkout} from '../util/workout_api_util';

export const RECEIVE_WORKOUTS = 'RECEIVE_WORKOUTS';
export const RECEIVE_USER_WORKOUTS = 'RECEIVE_USER_WORKOUTS';
export const RECEIVE_NEW_WORKOUT = 'RECEIVE_NEW_WORKOUT';

const receiveWorkouts = workouts => {
    return{
        type: RECEIVE_WORKOUTS,
        workouts
    }
};

const receiveUserWorkouts = workouts => ({
    type: RECEIVE_USER_WORKOUTS,
    workouts
});


export const fetchWorkouts = () => dispatch =>(
    getWorkouts()
    .then(workouts=> dispatch(receiveWorkouts(workouts)))
    .catch(err => console.log(err))

);

export const fetchUserWorkouts = id => dispatch => (
    getUserWorkouts(id)
    .then(workouts=> dispatch(receiveUserWorkouts(workouts)))
    .catch(err => console.log(err))
);

export const createWorkout = data => dispatch => (
    createUserWorkout(data)
    .then(workout => dispatch(receiveWorkouts(workout)))
    .catch(err => console.log(err))
)

export const deleteUserWorkout = id => dispatch =>(
    deleteWorkout(id)
    .then(workouts => dispatch(receiveWorkouts(workouts)))
    .catch(err => console.log(err))
    
);


export const updateUserWorkout = id => dispatch => {
    updateWorkout(id)
    .then(workout => dispatch(receiveWorkouts(workout)))
    .catch(err => console.log(err))
}