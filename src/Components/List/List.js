import React, { Component } from 'react'
import escapeString from 'escape-string-regexp'

import './List.css'

class List extends Component {

    state = {
        query: '',
        venues: this.props.venues
    }

    handleUpdateQuery(query) {
        let filteredVenues
        if (query) {
            const matched = new RegExp(escapeString(query), 'i')
            filteredVenues = this.props.venues.filter(venue => matched.test(venue.venue.name))
            this.setState({
                venues: filteredVenues
            })
        }
    }

    openInfowindow = (venueName) => {
        this.props.markers.map(marker => {
            if(marker.title === venueName) {
                window.google.maps.event.trigger(marker, 'click')
            }
        })
    }


    render() {
        //console.log(this.state.venues)
            let venues
            if (this.state.venues === []) {
                venues = this.props.venues
            } else {
                venues = this.state.venues
            }

        return (
            <aside className="collapse">
                <h1>Neighborhood Map</h1>
                <div className="form-input">
                    <label htmlFor='search-venue' role='search'>Search venue</label>
                    <div tabIndex="0"></div>
                    <input 
                        type="text"
                        id="search-venue"
                        onChange={
                            (e)=>this.handleUpdateQuery(e.target.value)
                        }
                    />
                </div>
                <ul>
                    {venues.map((venue, index) => (
                        <li key={index} tabIndex="0" onClick={ (e) => this.openInfowindow(venue.venue.name)}>{venue.venue.name}</li>
                    ))}
                </ul>
            </aside>
        )
    }

}

export default List