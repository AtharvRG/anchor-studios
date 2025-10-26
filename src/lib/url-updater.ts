export const updateHash = (hash: string) => {
  if (typeof window !== 'undefined') {
    window.history.pushState(null, '', `#${hash}`);
  }
};