import React from 'react'

const Icon = ({alt ,className, image, onClick}) => {

    return (
        <div className={className} onClick={onClick}>
            <img  src={image} alt={alt}/>
        </div>
    )
}

export default Icon
