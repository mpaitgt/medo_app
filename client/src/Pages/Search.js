import React, {Component} from 'react';
// import Container from '../Components/Container';
import Card from '../Components/Card';
import ContentCard from '../Components/ContentCard/ContentCard';
import MusicCard from '../Components/MusicCard';
import SearchBar from '../Components/SearchBar';
import SearchBtn from '../Components/SearchBtn';
import Button from '../Components/Button';
import Transition from '../Components/Transition';
import Text from '../Components/Text';
import {Container, Row, Col} from 'react-grid-system';
import styled from '@emotion/styled';
import omdb from '../Utils/omdb';
import spotify from '../Utils/spotify';
import SearchCard from '../Components/SearchCard';

class Search extends Component {
  state = {
    search: '',
    data: [],
    results: null,
    message: '',
    search_type: 'Watch'
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search_type == 'Watch') {
      omdb.getMovieByTerm(this.state.search)
      .then(res => {
        console.log(res.data);
        if (res.data.length === 0) {
          this.setState({ results: false })
        } else {
          this.setState({ data: res.data, results: true });
        }
      })
      .catch(err => console.log(err));
    }
    else if (this.state.search_type == 'Listen') {
      spotify.getTracks(this.state.search)
        .then(res => {
          console.log(res.data)
          if (res.data.length === 0) {
            this.setState({ results: false })
          } else {
            this.setState({ data: res.data, results: true });
          }
        })
        .catch(err => console.log(err))
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  displayResponse = () => {
    if (this.state.data.length === 0) {
      return <Text variant="h3">There are no results</Text>
    } else {
      return null;
    }
  }

  toggleSearch = e => {
    console.log(e.target);
    this.setState({ search_type: e.target.textContent }) 
  }

  render() {

    return (
      <Transition>
        <div className="page">
          <SearchCard 
            search_type={this.state.search_type}
            toggleSearch={this.toggleSearch}
            handleSubmit={this.handleSubmit}
            search={this.state.search}
            handleChange={this.handleChange}
          />
          {this.state.data.length === 0
          ?
          null
          :
          <Text variant="h4">{this.state.data.length} Results</Text>
          }
        </div>
        {
          this.state.search_type === 'Listen' && this.state.results
          ?
            this.state.data.map(artist => {
              return (
                <MusicCard content={artist} key={artist.id} />
              )
            })
          :
          this.state.search_type === 'Watch' && this.state.results
          ?
            this.state.data.map(movie => {
              return (
                <ContentCard content={movie} key={movie.id}/>
              )
            })
          :
          null
        }
      </Transition>
    )
  }
}

export default Search;