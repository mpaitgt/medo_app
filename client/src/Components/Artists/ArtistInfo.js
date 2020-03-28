import React from 'react';
import Text from '../Text';
import Button from '../Button';
import Image from '../Image';

function ArtistInfo({artist, add, back}) {
  return (
    <div>
      <Image 
        src={artist.images[0].url} 
        alt={`${artist.name} photo`} 
        type="music"
      />
    <Text variant="h1">{artist.name}</Text>
    <Text variant="p1">{artist.genres.join(', ')}</Text>
    <Button onClick={back}>Back</Button>
    <Button onClick={add}>Add to Listen List</Button>
  </div>
  )
}

export default ArtistInfo;