import React from 'react';
import mediator from './FavouritesMediator';

function handleClick(event) {
    var element = event.currentTarget;
    var key = element.dataset.key;

    if (element.parentElement.classList.contains('itemSelected')) {
        element.parentElement.classList.remove("itemSelected");
        mediator.publish('bet-update', {id: key, type: 'remove'});
    } else {
        element.parentElement.classList.add("itemSelected");
        mediator.publish('bet-update', {id: key, type: 'add'});
    }
}

const FavouritesListItem = ({id, name, price, active}) => {
    var disabled = !active;

    return (<div className={"favouritesListItem " + (active ? 'show': 'disabled')}>
        <p>{name}</p>
        <button disabled={disabled} data-key={id} onClick={handleClick}>{price}</button>
    </div>);
};

export default FavouritesListItem;