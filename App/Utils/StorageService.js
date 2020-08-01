import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const setApiKey = key => {
  AsyncStorage.setItem('api_key', key);
};

const getApiKey = async () => {
  try {
    const apiKey = await AsyncStorage.getItem('api_key');
    return apiKey;
  } catch (error) {
    return error;
  }
};

const setThemeId = id => {
  AsyncStorage.setItem('theme_id', id);
};
const getThemeId = async () => {
  try {
    const themeId = await AsyncStorage.getItem('theme_id');
    return themeId;
  } catch (error) {
    return error;
  }
};
export default {
  setApiKey,
  getApiKey,
  setThemeId,
  getThemeId
};
