import { act, render, screen } from '@testing-library/react';
import {
  forwardRef,
  ReactElement,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';

import {
  ResizeContext,
  ResizeContextProps,
  ResizeProvider,
} from '@/shared/contexts/resize-provider';

vi.mock('allotment', () => {
  const Allotment = forwardRef(
    ({ children }: { children: ReactElement }, ref) => {
      const localRef = useRef<HTMLDivElement>(null);

      useImperativeHandle(ref, () => ({
        resize: (sizes: number[]) => () => vi.fn(() => sizes),
        reset: () => vi.fn(),
      }));

      return <div ref={localRef}>{children}</div>;
    }
  );
  Allotment.displayName = 'Allotment';

  const Pane = ({ children }: { children: ReactElement }) => (
    <div>{children}</div>
  );
  Pane.displayName = 'Pane';

  return {
    Allotment,
    Pane,
  };
});

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
