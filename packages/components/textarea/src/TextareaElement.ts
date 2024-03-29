import TextareaAutosize from 'react-autosize-textarea';

import styled, { majorScale } from '@real-system/styled-library';

import type { TextareaProps } from './types';

const TextareaElement = styled(TextareaAutosize)<TextareaProps>({
  appearance: 'none',
  background: 'transparent',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 4,
  boxShadow: 'none',
  color: 'inherit',
  display: 'block',
  fontFamily: 'inherit',
  fontSize: 'input',
  fontWeight: 3,
  lineHeight: 1,
  maxHeight: majorScale(30),
  outline: 'none',
  padding: 6,
  resize: 'vertical',
  width: '100%',

  '&::placeholder': {
    color: 'gray-200',
  },

  '&:hover::placeholder': {
    color: 'gray-300',
  },

  '&:focus::placeholder': {
    color: 'gray-300',
  },

  '&:disabled': {
    color: 'gray-300',
    cursor: 'default',
    // Fixes value color in Safari
    '-webkit-text-fill-color': 'gray-50',
    '-webkit-opacity': '1',
  },
});

export { TextareaElement };
