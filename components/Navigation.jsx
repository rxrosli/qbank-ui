import React from 'react'
import Icon from './Icon'

const Navigation = () => {
    return (
        <nav className="page-nav">
            <div className="nav-top-flex">
                <Icon className="nav-item" id="collapse" image="icons/chevron_duo_left.svg"/>
                <Icon className="nav-item" id="create-question" image="icons/plus.svg"/>
                <Icon className="nav-item" id="search-question" image="icons/search.svg"/>
                
            </div>
            <div className="nav-bottom-flex">
                <Icon className="nav-item" id="collapse" image="icons/settings_filled.svg"/>
            </div>


           
        </nav>
    )
}

export default Navigation
