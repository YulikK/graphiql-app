import { EditorView } from '@codemirror/view';
import { fireEvent, screen } from '@testing-library/react';

import { setGraphQuery } from '@/shared/store/slices/grahpql-client';
import { renderWithProviders } from '@/tests/setup/render-router';

import {
  testUseAppDispatch,
  testUseAppSelector,
  testUseGraphRequest,
} from '../../../vitest.setup';

import { GraphQuery } from './client-query';

const mockDispatch = vi.fn();
const mockMakeRequest = vi.fn();

testUseAppDispatch.mockReturnValue(mockDispatch);
testUseGraphRequest.mockReturnValue(mockMakeRequest);
testUseAppSelector.mockReturnValue({
  query: '',
  schema: null,
  urlDoc: '',
  isTrySchemaDownload: false,
});

describe('GraphQuery', () => {
  it('should render CodeEditor component', () => {
    renderWithProviders(<GraphQuery />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should dispatch setGraphQuery on handleGraphqlChange', () => {
    renderWithProviders(<GraphQuery />);
    const codeEditor = screen.getByRole('textbox');
    const view = EditorView.findFromDOM(codeEditor);
    view?.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: 'new query' },
    });
    expect(mockDispatch).toHaveBeenCalledWith(setGraphQuery('new query'));
  });

  it('should call makeRequest on onBlur', () => {
    renderWithProviders(<GraphQuery />);
    const codeEditor = screen.getByRole('textbox');
    fireEvent.blur(codeEditor);
    expect(mockMakeRequest).toHaveBeenCalled();
  });
});
