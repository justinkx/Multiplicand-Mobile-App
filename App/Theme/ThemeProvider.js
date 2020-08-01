import React, { useContext, useState, useEffect, useMemo } from 'react';

export const ThemeContext = React.createContext();

import storageService from '../Utils/StorageService';

import Themes from './themes.json';

export const ThemeContextProvider = ({ children }) => {
  const [themeID, setThemeID] = useState();

  useEffect(() => {
    (async () => {
      const storedThemeID = await storageService.getThemeId();
      if (storedThemeID) {
        setThemeID(storedThemeID);
      } else {
        setThemeID(Themes[0].key);
      }
    })();
  }, []);

  const Theme = useMemo(
    () => ({
      getTheme: () => Themes.find((theme) => theme.key === themeID),
      setTheme: (themeId) => {
        storageService.setThemeId(themeId);
        setThemeID(themeId);
      },
    }),
    [themeID],
  );

  return (
    <ThemeContext.Provider value={{ themeID, Theme }}>
      {themeID ? children : null}
    </ThemeContext.Provider>
  );
};

export function wrapTheme(Component) {
  return (props) => {
    const { themeID, setThemeID } = useContext(ThemeContext);
    const getTheme = (themeID) => Themes.find((theme) => theme.key === themeID);
    const setTheme = (themeID) => setThemeID(themeID);

    return (
      <Component
        {...props}
        themes={Themes}
        theme={getTheme(themeID)}
        setTheme={setTheme}
      />
    );
  };
}
