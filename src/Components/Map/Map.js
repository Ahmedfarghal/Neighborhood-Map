import React, {Component} from 'react'
import Header from '../Header/Header'

import './Map.css'

class Map extends Component {

    componentDidMount() {
        this.toggleMenu()
    }


    toggleMenu = () => {
        const menuBtn = document.querySelector('.menu-btn')
        const aside = document.querySelector('aside')
        const wrapper = document.querySelector('.wrapper')

        menuBtn.addEventListener("click", () => {
            aside.classList.toggle("collapse")
            wrapper.classList.toggle("collapse")
            console.log("Clicked!")
            console.log(aside)
        })
    }

    render() {
        return (
            <div className="wrapper collapse">
                <Header/>
                <div id="map" role='application'></div>
            </div>
            
        )
    }
}

export default Map