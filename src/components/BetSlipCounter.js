import React, { Component } from 'react';
import mediator from './FavouritesMediator';

class BetSlipCounter extends Component {
    state = {
        counter: 0,
        horseIDs: []
    };

    componentDidMount() {
        mediator.subscribe('state-change', (data) => {
            console.log('state-change accepted by counter');
            console.log(data);
            var selectedArray = this.state.horseIDs;
            var counter = this.state.counter;

            for (var i = 0; i < data.length; i++) {
                var id = data[i].id.toString();
                var state = data[i].active;
                var index = selectedArray.indexOf(id);
                if (index > -1 && !state) {
                    selectedArray.splice(index, 1);
                    counter--;
                } 
            }

            this.setState({counter, horseIDs: selectedArray});
        });
        mediator.subscribe('bet-update', (data) => {
            console.log('bet-update accepted by counter');
            console.log(data);
            var id = data.id.toString();

            if (data.type === 'add' && !this.state.horseIDs.includes(id)) {
                var array = this.state.horseIDs;
                array.push(id);
                this.setState({counter: this.state.counter + 1, horseIDs: array});
            } else if (data.type === 'remove' && this.state.horseIDs.includes(id)) {
                var newArray = this.state.horseIDs;
                var index = newArray.indexOf(id);
                if (index > -1) {
                    newArray.splice(index, 1);
                } 

                this.setState({counter: this.state.counter - 1, horseIDs: newArray});
            }
        });
    }

    render() {
        return (
            <div className="counterContainer">
                <p className="betslipCounter">{this.state.counter}</p>
                <select defaultValue="betslip">
                    <option value="betslip">BET SLIP</option>
                </select>
            </div>
        );
    };
};

export default BetSlipCounter;