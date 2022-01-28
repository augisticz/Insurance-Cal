import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';

// eslint-disable-next-line no-undef
global.React = React;

Enzyme.configure({
  adapter: new EnzymeAdapter()
});