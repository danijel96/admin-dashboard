import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
	})),
});
