import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
//Image
import searchIcon from '../../images/search-icon.svg';
//Styles
import { Wrapper, Content } from './SearchBar.style';

const SearchBar = ({ setSearchTerm }) => {
  // We use setSearch Term to set state

  const [state, setState] = useState('');
  // useRef won't trigger rerender unlike state
  const initial = useRef(true)

  useEffect(() => {

    //We only want the useEffect to trigger when user types into input field 
    // and not on initial render i.e when the search component mounts

    if (initial.current) {
      // Since useRef don't trigger rerender, we don' need a set function to change its value
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => { 
      setSearchTerm(state);
    }, 500);

    //Cleanup
    return () => clearTimeout(timer);
  }, [state, setSearchTerm])

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt='search-icon' />
        <input 
          type='text' 
          placeholder='Search Movies' 
          onChange={event => setState(event.currentTarget.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  )
}

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func
}

export default SearchBar;