import React from 'react';
import styled from '@emotion/styled';

let CARD = styled.div`
  border-radius: 8px;
  border: 5px solid white;
  padding: 6px 32px;
  -webkit-box-shadow: 0px 0px 26px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 26px -10px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 26px -10px rgba(0,0,0,0.75);
`;

function Card({ children }) {
  return(
    <CARD className="card">
      {children}
    </CARD>
  )
}

export default Card;