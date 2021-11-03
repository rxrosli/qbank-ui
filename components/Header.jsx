import React from 'react'
import Icon from './Icon'

const Header = ({setActive}) => {
    return (
        <header className="page-header">
            <Icon 
                className="page-header-icon"
                name="menu" 
                image="icons/hamburger.svg"
                onClick={() => setActive(true)}
            />
            
        </header>
    )
}

export default Header
