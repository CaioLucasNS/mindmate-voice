import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('Sanity Test', () => {
  it('renders hello world', () => {
    const { getByText } = render(<Text>Hello World</Text>);
    expect(getByText('Hello World')).toBeTruthy();
  });
});

describe('Sanity test 2', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
});
