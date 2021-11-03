import React from 'react'

const Icon = ({alt ,className, image, onClick}) => {
    const size = 40;
    return (
        <div className={className} onClick={onClick}>
            <img  width={size} height={size} src={image} alt={alt}/>
        </div>
    )
}

export default Icon
