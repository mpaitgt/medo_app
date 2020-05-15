import React from 'react';
import Input from '../Elements/Input';
import Text from '../Elements/Text';
import Card from '../Elements/Card';
import Button from '../Elements/Button';
import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  margin: 20px 0px;
`;

function ArtistAlbum(props) {
  
  return (
    <Card>
      <Text variant="h2">Share a new album</Text>
      <div>
        <Text variant="label">Artist</Text>
        <Input type="text" name="artist" value={props.artist} onChange={props.handleChange} />
      </div>
      <div>
        <Text variant="label">Album</Text>
        <Input type="text" name="album" value={props.album} onChange={props.handleChange} />
      </div>
      <div>
        <Text variant="label">Select genres:</Text>
        <Grid>
          {props.renderGenres}
        </Grid>
      </div>
      <Button onClick={props.nextStep}>Continue</Button>
    </Card>
  )
}

export default ArtistAlbum;