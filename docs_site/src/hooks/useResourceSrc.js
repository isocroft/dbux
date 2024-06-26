import React from 'react';


import useThemeContext from '@theme/hooks/useThemeContext';
import useBaseUrl from './useBaseUrl';

/**
 * Look up resource src, relative to a resources/light or resources/dark folder.
 * 
 * @see https://stackoverflow.com/questions/64425555/is-it-possible-to-detect-if-docusaurus-is-in-light-or-dark-mode
 */
export default function useResourceSrc({ src, darkLight }) {
  /**
   * @see https://docusaurus.io/docs/api/themes/configuration#hooks
   */
  const { isDarkTheme } = useThemeContext();
  
  const baseUrl = useBaseUrl();

  let modePath;
  if (!darkLight) {
    // only add `dark/light` to the path if specifically required
    modePath = '';
  }
  else {
    modePath = isDarkTheme ? 'dark/' : 'light/';
  }
  return `${baseUrl}${modePath}${src}`;
}