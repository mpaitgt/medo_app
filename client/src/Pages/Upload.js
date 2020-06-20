import React, {useState, useEffect, useContext} from 'react';
import {DetailsUpload, ImageUpload, StoryUpload, ConfirmSubmission} from '../Components/AlbumUpload';
import {NewSubmissionSuccess} from '../Components/Success';
import {Text, Input, Container} from '../Components/Elements';
import {UserContext} from '../Components/Providers/UserProvider';
import API from '../Utils';

const Upload = () => {
  // const [user, setUser] = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState(null);
  const [story, setStory] = useState('');
  const [genres, setGenres] = useState([]);

  // useEffect(
	// 	() => {
  //     const userObj = JSON.parse(API.userauth.getLocalStorage('user'));
	// 		if (userObj) setUser(userObj);
  //   },
	// 	[]
	// );

  const album = {
    // submitted_by: { _id: user._id, username: user.username },
    title: title,
    artist: artist,
    image: image,
    story: story,
    genres: genres
  };

  const genresArray = ['Rock', 'Indie', 'Hip Hop', 'Folk', 'Alternative', 'Electronic', 'Pop', 'Punk', 'Reggae', 'Jazz', 'Funk', 'Hardcore'];

  const renderGenres = genresArray.map((genre, i) => {
    return (
      <div key={i}>
        <Input onChange={e => handleGenres(e)} type='checkbox' name='genres' value={genre} />
        <Text variant='label-inline' for='genres'>{genre}</Text>
      </div>
    )
  })

  const displayForm = () => {
    switch(step) {
      case 1:
        return (
          <DetailsUpload 
            title={title} 
            artist={artist} 
            handleChange={handleChange} 
            renderGenres={renderGenres} 
            setStep={setStep}
            step={step}
            // user={user}
          />
        )
      case 2:
        return (
          <ImageUpload 
            image={image}
            handleChange={handleChange}
            setStep={setStep}
            step={step}
          />
        )
      case 3:
        return (
          <StoryUpload 
            story={story}
            handleChange={handleChange}
            setStep={setStep}
            step={step}
          />
        )
      case 4: 
      return (
        <ConfirmSubmission
          album={album}
          onSubmit={onSubmit}
          step={step}
        />
      )
      case 5:
        return (
          <NewSubmissionSuccess />
        )
      default:
        return (
          <DetailsUpload 
            title={title} 
            artist={artist} 
            handleChange={handleChange} 
            renderGenres={renderGenres} 
            setStep={setStep}
            step={step}
          />
        )
      }
  }

  const handleGenres = e => {
    const { checked, value } = e.target;
    if (checked) {
      setGenres([...genres, value]);
    }
    if (!checked) {
      const newGenres = genres.filter(item => item !== value);
      setGenres(newGenres);
    }
  }

  const handleChange = e => {
    const { type, name, value, files } = e.target;
    // for type text
    if (type === 'text') {
      if (name === 'title') setTitle(value);
      if (name === 'artist') setArtist(value);
      if (name === 'story') setStory(value);
    }
    // for type file
    if (type === 'file') setImage(files[0]);
  }

  const onSubmit = e => {
    e.preventDefault();
    let record = {
      artist: artist,
      title: title,
      image: image,
      story: story, 
      genres: genres,
      // submitted_by: user
    };
    API.db.addAlbum(record);
    setStep(step + 1);
  }

  return (
    <Container>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        {displayForm()}
      </form>
    </Container>
  )
};

export default Upload;