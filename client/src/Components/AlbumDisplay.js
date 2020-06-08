import React, {useContext} from 'react';
import Button from '../Components/Elements/Button';
import Text from '../Components/Elements/Text';
import {PayloadContext} from '../Components/Providers/PayloadProvider';
import styled from '@emotion/styled';
import spotify from '../Utils/spotify';
import helpers from '../Utils/helpers';

const Flex = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  flex-direction: row;
  align-items: center;
  grid-gap: 20px;
`;

function AlbumDisplay({ display, album }) {
  const [record, setRecord] = useContext(PayloadContext);
  const { image, title, artist, genres, story, date_added } = album;

  const recordDetails = (title, artist) => {
    spotify.getAlbums(title)
      .then(res => {
        let albumData = res.data.filter(item => {
          return item.album_type === 'album' && item.artists[0].name === artist;
        });
        setRecord(albumData);
        return albumData[0];
      })
      .then(data => {
        console.log(data.id);
        window.location.replace(`/albums/id/${data.id}`)
      })
      .catch(err => console.log(err));
  }

  return (
    <Flex>
      <img 
        style={{ justifySelf: 'center', margin: '20px' }} 
        width="350" src={image.url} 
        alt={`${album.title} by ${artist}`} 
      />
      <div>
        <Text variant="h1">{title}</Text>
        <Text variant="h2">by {artist}</Text>
        <Text variant="h4">{genres.join(', ')}</Text>
        <Text variant="p1">{story}</Text>
        {/* <Path to={`/albums/id/${artist}/${title}`}> */}
          <Button onClick={() => recordDetails(title, artist)}>Details</Button>
        {/* </Path> */}
        <Button>Share your story</Button>
        <Text variant="h4">Added on {helpers.convertDate(date_added)}</Text>
      </div>
    </Flex>
  )
}

export default AlbumDisplay;