import React from 'react'

const Icon = ({id ,className, image, onClick}) => {
    const size = 40;
    return (
        <img className={className} width={size} height={size} src={image} alt={id}/>
    )
}

export default Icon
