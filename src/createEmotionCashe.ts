import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// On the client, we store the cache in a global variable to share it between page loads.
let cache;

if (isBrowser) {
  cache = createCache({ key: 'css', prepend: true });
} else {
  cache = createCache({ key: 'css' });
}

export default cache;