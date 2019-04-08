import React, { Component } from 'react';
import './App.css';
import List from './Components/List/List'
import Map from './Components/Map/Map'
import axios from 'axios'


class App extends Component {
  state = {
    venues: [],
    markers: []
  } 

  componentDidMount() {
    this.loadPlaces()
  }

  loadPlaces = () => {
    // FourSquare API Parameters
    const ApiParams = {
      client_id: 'QAV5ZBZZPGL0A1KCWUYFXIQXV1S4C4DMGGOKJQ0HOVGWUP3D',
      client_secret: 'MFVGT2XMCMLP4E0HKNGZD1EPLXRUHNBA5ZMYZDLPPROF2PRJ',
      v: '20180323',
      near: 'egypt',
      query: 'outdoor'
    }

    // Fetch FourSquare API Venues
    axios.get('https://api.foursquare.com/v2/venues/explore?' + new URLSearchParams(ApiParams))
      .then(response => {

        // Update the `venues` state then Load map
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.loadMap())
      })
      .catch((error)=> {
        if (error.response) {
            alert("Foursquare API Failed To Load ");
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
        } else if (error.request) {
              console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
        }
      }
    )

  }

  loadMap = () => {
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxBl321x26VyuLKiMehrmd_4yFs8bDs5o&callback=initMap')
    window.initMap = this.initMap
  }


  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 30.025527,
        lng: 31.237752
      },
      zoom: 10,
    })


    let infowindow = new window.google.maps.InfoWindow()

    // Creating dynamic Markers
    this.state.venues.map((venue) => {

      let location = {
        lat: venue.venue.location.lat,
        lng: venue.venue.location.lng
      }

      var marker = new window.google.maps.Marker({
        position: location,
        title: venue.venue.name,
        animation: window.google.maps.Animation.DROP,
        map: map
      })

      let content = `<h2>${venue.venue.name}</h2>
                     <h3>${venue.venue.location.address}, ${venue.venue.location.city}</h3>`

      // Click on each Marker
      marker.addListener('click', () => {
        infowindow.open(map, marker)
        infowindow.setContent(content)
        
      })

      this.state.markers.push(marker);

    })
  }
  
  render() {
    return (
      <main>

        <List 
          venues={this.state.venues}
          markers={this.state.markers}
        />
        <Map />

      </main>
    )
  }
}

function loadJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
  script.onerror = function () {
    document.write("Map failed to load correctly. Please try again.")
  }
}

export default App