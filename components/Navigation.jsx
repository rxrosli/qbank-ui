import React from 'react'
import Icon from './Icon'

const Navigation = ({isActive, setActive}) => {
    const navClassName = isActive ? 'page-nav is-active' : 'page-nav';
    return (
        <nav className={navClassName}>
            <div className="nav-top-flex">
                <Icon 
                    alt="collapse"
                    className="nav-item"  
                    image="icons/chevron_duo_left.svg"
                    onClick={() => setActive(true)}/>
                <Icon className="nav-item" alt="create-question" image="icons/plus.svg"/>
                <Icon className="nav-item" alt="search-question" image="icons/search.svg"/>
                
            </div>
            <div className="nav-bottom-flex">
                <Icon className="nav-item" alt="collapse" image="icons/settings_filled.svg"/>
            </div>
        </nav>
    )
}

export default Navigation
