import React from 'react';
import styled from '@emotion/styled';

const INPUT = styled.input`
  border: none;
  border-radius: 3px;
  text-align: left;
  font-family: var(--subfont);
  font-size: 14px;
  background: var(--gray-6);
  transition: all 0.25s;
  width: 80%;
  margin: 0 auto;
  padding: 5px 10px;
  &:focus {
    outline: none;
    transition: all 0.25s;
  }
  &::placeholder {
    color: var(--gray-4);
    font-family: var(--subfont);
  }
  &:focus::placeholder {
    color: var(--white);
  }
`;

function Input({ name, value, type, placeholder, onChange }) {
  return (
    <div>
      <INPUT 
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default Input;