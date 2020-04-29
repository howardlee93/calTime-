//eventmodal.jsx

import React from 'react';
import Modal from '@material-ui/core/Modal';

import './event.css';

import EventForm from './eventform';


class EventModal extends React.Component{
	
	state = {
		title: "",
		open: false
	}

	

	handleOpen(){
		this.setState({
			open: true
		})
	}

	handleClose(){
		this.setState({
			open: false
		})
	}

	

	render(){
		return(

			<div>
			<button type="button" onClick={() =>this.handleOpen()}>
        	Create event
    		</button>
			
			<Modal className="modal"
				open={this.state.open}
  				onClose={()=>this.handleClose()}
  			>

  			<EventForm/>

  			</Modal>
  			</div>

			)
	}


};


export default EventModal;
