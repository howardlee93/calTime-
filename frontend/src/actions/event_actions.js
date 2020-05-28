import * as APIUtil from '../util/api_util';



//types 

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const RECEIVE_SINGLE_EVENT = 'RECEIVE_SINGLE_EVENT';


export const DELETE_EVENT = 'DELETE_EVENT';



export const receiveEvents = (events) => {
	return {
		type: RECEIVE_EVENTS,
		events
	}

};

export const receiveSingleEvent = (event) =>({
	type: RECEIVE_SINGLE_EVENT,
	event
})


export const deleteSingleEvent = (event) =>({
	type: DELETE_EVENT,
	event 
})

export const fetchEvents = () => dispatch => {
	APIUtil.fetchEvents()
	.then((events) =>dispatch(receiveEvents(events)))
	.catch(err=> console.log(err))

}


export const createEvent = data => dispatch =>(
	APIUtil.createEvent(data)
	.then(event => dispatch(receiveSingleEvent(event)))
	.catch(err => console.log(err))
	)


export const updateEvent = (id, data) => dispatch => (
	APIUtil.updateEvent(id, data)
	.then(event => dispatch(receiveSingleEvent(event)))
	.catch(err => console.log(err))
	) 


export const deleteEvent = id => dispatch => (
	APIUtil.deleteEvent(id)
	.then(event => deleteSingleEvent(event))
	.catch(err => console.log(err))

	)

export const fetchEventsByDate = date => dispatch =>(
	APIUtil.fetchEventsByDate(date)
	.then(events => receiveEvents(events))
	.catch(err =>console.log(err))

	)