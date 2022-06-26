/* eslint-disable react/jsx-closing-tag-location */
import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Input } from '@real-system/input';
import { ThemeProvider } from '@real-system/styled-library';

import { Field, FieldProps } from '../src/Field';
import { FieldGroup } from '../src/FieldGroup';
import { FieldGroupProps } from '../src/types';

const FieldComponent = (props: FieldProps) => (
  <ThemeProvider theme={TEST_THEME}>
    <Field {...props} />
  </ThemeProvider>
);

const inputId = 'name';
const helpText = 'Your name';
const errorText = 'Name is required';
const FieldInput = () => <Input id={inputId} type="text" />;

describe('Field', () => {
  it('renders with builtins', () => {
    const { rerender } = render(
      <FieldComponent label="Name" labelFor={inputId} helpText={helpText}>
        <FieldInput />
      </FieldComponent>
    );
    expect(screen.getByLabelText('Name')).toBeTruthy();
    expect(screen.getByText(helpText)).toBeTruthy();
    expect(screen.queryByText(errorText)).toBeFalsy();

    rerender(
      <FieldComponent
        label="Name"
        labelFor={inputId}
        helpText={helpText}
        errorText={errorText}>
        <FieldInput />
      </FieldComponent>
    );

    expect(screen.queryByText(helpText)).toBeFalsy();
    expect(screen.getByText(errorText)).toBeTruthy();
  });
  it('renders without builtins', () => {
    render(
      <FieldComponent label="Bad label" helpText={helpText}>
        <label htmlFor="input">Good label</label>
        <input id="input" />
      </FieldComponent>
    );
    expect(screen.queryByLabelText('Bad label')).toBeFalsy();
    expect(screen.queryByText(helpText)).toBeFalsy();
    expect(screen.getByLabelText('Good label')).toBeTruthy();
  });
});

const FieldGroupComponent = (props: FieldGroupProps) => (
  <ThemeProvider theme={TEST_THEME}>
    <FieldGroup {...props}>
      <Field />
    </FieldGroup>
  </ThemeProvider>
);

const getFieldGroup = () => screen.getByTestId('real-system-field-group');

describe('Field Group', () => {
  it('renders', () => {
    render(<FieldGroupComponent />);
    expect(getFieldGroup()).toBeTruthy();
  });
  it('renders inline', () => {
    render(<FieldGroupComponent inline />);
    expect(getFieldGroup()).toBeTruthy();
    expect(getFieldGroup()).toHaveStyleRule('gap', '1.6rem');
    expect(getFieldGroup()).toHaveStyleRule('flex-direction', 'row');
  });
});
