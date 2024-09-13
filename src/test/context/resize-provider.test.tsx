import { act, render, screen } from '@testing-library/react';
import { ReactElement, useContext } from 'react';

import {
  ResizeContext,
  ResizeContextProps,
  ResizeProvider,
} from '@/shared/contexts/resize-provider';

vi.mock('allotment', () => ({
  Allotment: ({ children }: { children: ReactElement }) => {
    return <div>{children}</div>;
  },
  Pane: ({ children }: { children: ReactElement }) => <div>{children}</div>,
}));

describe('ResizeProvider', () => {
  it('should have initial state with isPaneHide true', () => {
    render(
      <ResizeProvider>
        <div>Test</div>
      </ResizeProvider>
    );

    const context = screen.getByText('Test').closest('div');
    expect(context).toBeInTheDocument();
  });

  it('should call onMaximize and change isPaneHide to false', () => {
    let contextValue: ResizeContextProps | undefined;
    const TestComponent = () => {
      contextValue = useContext(ResizeContext);

      return <div>Test</div>;
    };

    render(
      <ResizeProvider>
        <TestComponent />
      </ResizeProvider>
    );

    act(() => {
      if (contextValue) {
        contextValue.onMaximize();
      }
    });

    expect(contextValue?.isPaneHide).toBe(false);
  });

  it('should call onMinimize and change isPaneHide to true', () => {
    let contextValue: ResizeContextProps | undefined;
    const TestComponent = () => {
      contextValue = useContext(ResizeContext);

      return <div>Test</div>;
    };

    render(
      <ResizeProvider>
        <TestComponent />
      </ResizeProvider>
    );

    act(() => {
      if (contextValue) {
        contextValue.onMinimize();
      }
    });

    expect(contextValue?.isPaneHide).toBe(true);
  });

  it('should handle settings resize', () => {
    let contextValue: ResizeContextProps | undefined;
    const TestComponent = () => {
      contextValue = useContext(ResizeContext);

      return <div>Test</div>;
    };

    render(
      <ResizeProvider>
        <TestComponent />
      </ResizeProvider>
    );

    act(() => {
      if (contextValue) {
        contextValue.onMaximize();
      }
    });

    expect(contextValue?.isPaneHide).toBe(false);

    act(() => {
      if (contextValue) {
        contextValue.onMinimize();
      }
    });

    expect(contextValue?.isPaneHide).toBe(true);
  });
});
