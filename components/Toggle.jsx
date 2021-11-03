import React from 'react'

const Toggle = ({isActive, setActive}) => {
    return (
    <div 
        className={isActive ? 'toggle is-active' : 'toggle'}
        onClick={() => setActive(!isActive)}>
        <span className="toggle-slider"/>
    </div>
    )
}

export default Toggle
