import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 
import { useRef } from 'react';
import { useOnClickOutside } from './use-onclick-outside';
import { useEventListener } from 'usehooks-ts'; 
jest.mock('usehooks-ts', () => ({
  useEventListener: jest.fn(),
}));

describe('useOnClickOutside hook', () => {
  test('calls the handler when clicking outside the target element', () => {
    const handler = jest.fn();
    const ref = useRef(null);

    render(
      <div>
        <div data-testid="inside" ref={ref}>
          Inside
        </div>
        <div data-testid="outside">Outside</div>
      </div>
    );

    useOnClickOutside(ref, handler);

  
    const event = new MouseEvent('mousedown');
    Object.defineProperty(event, 'target', { value: document.createElement('div') });

    (useEventListener as jest.Mock).mock.calls[0][1](event); 
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('does not call the handler when clicking inside the target element', () => {
    const handler = jest.fn();
    const ref = useRef(null);

    render(
      <div>
        <div data-testid="inside" ref={ref}>
          Inside
        </div>
        <div data-testid="outside">Outside</div>
      </div>
    );

    useOnClickOutside(ref, handler);

    
    const event = new MouseEvent('mousedown');
    Object.defineProperty(event, 'target', { value: document.querySelector('[data-testid="inside"]') });

    (useEventListener as jest.Mock).mock.calls[0][1](event);
  });
});
