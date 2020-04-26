import React from 'react';

import moment from 'moment';

import './calendar.css';


import EventModal from '../event/eventmodal';


class Calendar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dateObject: moment(),
			allmonths: moment.months(),
			selectedDay: null,
			showYearTable: false,
			showMonthTable: false,
			showDateTable: false,
			modalDisplay: false,

		}
		this.yearTable = this.yearTable.bind(this);
		this.monthList = this.monthList.bind(this);


	}

	weekdayshort = moment.weekdaysShort();


	onPrev(){
		let current = "";
		if (this.state.showYearTable){
			current = "year";
		}else{
			current = "month";
		};
		this.setState({
			dateObject: this.state.dateObject.subtract(1, current)
		});
	};


	onNext(){
		let current = "";
		if (this.state.showYearTable){
			current = "year";
		}else{
			current = "month";
		};
		this.setState({
			dateObject: this.state.dateObject.add(1, current)

		});

	}

	daysInMonth(){
		return this.state.dateObject.daysInMonth();

	}

	year =()=>{
		return this.state.dateObject.format("Y")
	}


	


	onDayClick(e, d){
		this.setState({
			selectedDay: d,
			modalDisplay: !this.state.modalDisplay
		});


	}

	today = () => (
		this.state.dateObject.format("D")

	)

	firstDayOfMonth() {
		let dateObject = this.state.dateObject;
		let firstDay = moment(dateObject)
						.startOf("month")
                 		.format("d"); 
        return firstDay;

	}


	month = () => (
		this.state.dateObject.format("MMM")
	);

	showMonth(e, month){
		this.setState({
			showDateTable: !this.state.showDateTable,
			showMonthTable: !this.state.showMonthTable
		});

	}


	setMonth(month){
		let monthNum = this.state.allmonths.indexOf(month);
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("month", monthNum);

		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showDateTable : !this.state.showDateTable
		})
	}

	//difference is using the arrow function (trying bind)
	monthList(props){
		let months = [];
		props.data.forEach(data =>{
			months.push(
				<td key={data}
          		className="calendar-month"
          		onClick={e => {
            	this.setMonth(data);
          		}}
        		>
          		<span>{data}</span>
       			</td>
				);
			});
		let cells = [];
		let rows = [];
		months.forEach((row,i)=>{
			if ( i % 3 !== 0 || i === 0){
				cells.push(row);
			}else{
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
		});
		rows.push(cells);
		let monthlist = rows.map((date, i)=>{
			return <tr>{date}</tr>
		});

		return (
			<table>
				<thead>
					<tr>
					<th colSpan="4">Select a Month</th>
					</tr>

				</thead>
				<tbody> {monthlist}</tbody>
			</table>
			)

	};

	//years 
	showYearTable(e){
		this.setState({
			showYearTable : !this.state.showYearTable,
			showDateTable: !this.state.showDateTable
		});
	}


	setYear(year){
		let dateObject = Object.assign({}, this.state.dateObject);
		dateObject = moment(dateObject).set("year", year);
		this.setState({
			dateObject: dateObject,
			showMonthTable: !this.state.showMonthTable,
			showYearTable: !this.state.showYearTable
		});
	}


	onYearChange(e){
		this.setYear(e.target.value);

	}

	getDates(startDate, stopDate){
		let dateArr = [];
		let currentDate = moment(startDate);
		stopDate = moment(stopDate);
		while(currentDate <= stopDate){
			dateArr.push(moment(currentDate).format("YYYY"));
			currentDate = moment(currentDate).add(1, "year");

		}
		return dateArr;

	}
	//using arrow function VS binding it??
	yearTable(props){
		let months = [];
		let nextTen = moment()
			.set("year", props)
			.add("year", 12)
			.format("Y");

		let tenYear = this.getDates(props, nextTen);

		tenYear.forEach(data => {
			months.push(
				<td key ={data}
				className="calendar-month"
				onClick={e =>{this.setYear(data)
				}}
				>
				<span>{data}</span>
				</td>
				);
		});
		let rows = [];
		let cells = [];
		months.forEach((row, i)=>{
			if (i % 3 !== 0 || i === 0){
				cells.push(row);
			}else{
				rows.push(cells);
				cells = [];
				cells.push(row);
			}
		});
		rows.push(cells);
		let yearList = rows.map((d, i)=>{
			return <tr>{d}</tr>
		});
		return(
			<table className="calendar-month">
				<thead>
					<tr>
						<th colSpan="4"> Select a Year</th>
					</tr>
				</thead>
				<tbody>{yearList}</tbody>
				</table>
			)
			
	}

	render(){

		// calendar day 

	
		let weekdayshortname = this.weekdayshort.map(day => {
			return (
				<th key={day}>
					{day}
				</th>
			);
		});

		//empty calendar day cell
		let blankCells = [];
		for (let i = 0; i < this.firstDayOfMonth();  i ++){
			blankCells.push(
				<td className="days" key={i}>{" "}</td>
				)
		}

		let daysInMonth =[];

		for (let d = 1; d <= this.daysInMonth(); d++){
    		let currentDay = d = this.today() ? "today" : "";
    		daysInMonth.push(
    			<td key={d} className="calendar-day">
    			<span onClick={e =>{this.onDayClick(e,d)}}>
    			 
    			{d}
    			</span>
    			</td>
    			);
    	};
		

		let totalSlots = [...blankCells, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if (i % 7){
				cells.push(row)
			}else{
				rows.push(cells);
				cells = [];
				cells.push(row);

			}

			if ( i === totalSlots.length -1){
				rows.push(cells);

			}
		})

		let daysinmonth = rows.map((d, i) => {
      		return (<div>
      			<tr>{d}
      				<EventModal/>    				

      			</tr>
      			</div>
      			);
    	});




		return(

      		<div className="calendar">
        	 <div className="calendar-nav">
        	 <span onClick={e=> {this.onPrev()}}
        	 	className="calendar-button"
        	 />

        	 {!this.state.showMonthTable && (
        	 	<span onClick={e=>{
        	 		this.showMonth()
        	 		}}
        	 	>
        	 	<h1>{this.month()}</h1>
        	 	</span>
        	 )}
        	 <span onClick={e=> this.showYearTable()}>
        	 	{this.year()}
        	 </span>
        	 <span onClick={e => {
        	 	this.onNext()
        	 	}}
        	 />
      		</div>


      		<div className="calendar-date">
      			{this.state.showYearTable && <this.yearTable props={this.year()} />}
      			{this.state.showMonthTable && (
      				<this.monthList data={moment.months()}/>
      				)}
      		</div>

      			{this.state.showDateTable &&(
      			<div className="calendar-date">
		    	 <table className="calendar-day">
		            <thead>
		              <tr>{weekdayshortname}</tr>
		            </thead>
		            <tbody>
		            	{daysinmonth}
		            </tbody>
		         </table>
		         </div>
		         )}
      		</div>
			);
		}
};
export default Calendar;
