import React, { Component } from 'react';
import FavouritesListItem from './FavouritesListItem';
import mediator from './FavouritesMediator';

class FavouritesList extends Component {
    state = {
        selections: '',
        post: '',
        responseToPost: '',
    };
    
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ selections: res.response.selections }))
            .catch(err => console.log(err));
        mediator.subscribe('price-change', (data) => {
            console.log('price-change accepted by List');
            console.log(data);
            var updatedPriceSelections = this.state.selections;

            for (var i = 0; i < updatedPriceSelections.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (updatedPriceSelections[i].id === data[j].id) {
                        updatedPriceSelections[i].price = data[j].price;
                    }
                }
            }

            this.setState({selections: updatedPriceSelections});
            this.render();
        });
        mediator.subscribe('state-change', (data) => {
            console.log('state-change accepted by List');
            console.log(data);
            
            var updatedStateSelections = this.state.selections;

            for (var k = 0; k < updatedStateSelections.length; k++) {
                for (var l = 0; l < data.length; l++) {
                    if (updatedStateSelections[k].id === data[l].id) {
                        updatedStateSelections[k].active = data[l].active;
                    }
                }
            }

            this.setState({selections: updatedStateSelections});
            this.render();
        });
    }
    
    callApi = async () => {
        const response = await fetch('/rest/selections');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };
      
    render() {
        return (
            <div className="favouritesList">
                <h1>Upcoming Favourites</h1>   
                {this.state.selections !== '' && this.state.selections.map(function(horse) {
                    return <FavouritesListItem key={horse.id} {...horse}/>;
                })}
                <div className="multipleStakeContainer">
                    <p>Select your multiple stake:</p>
                    <button className="stakeButton">5</button>
                    <button className="stakeButton">10</button>
                    <button className="stakeButton">20</button>
                    <button className="stakeButton">25</button>
                    <button className="stakeButton">50</button>
                </div>
            </div>
        );
    }
}

export default FavouritesList;