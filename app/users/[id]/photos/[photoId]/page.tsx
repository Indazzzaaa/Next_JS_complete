import React from 'react'

interface Props{
    params: { id: number; photoId : number}
}


const PhotoPage = ( {params : {id,photoId}} : Props) => {
  return (
    <div>PhotoPage-User{id}-PhotoId{photoId} </div>
  )
}

export default PhotoPage