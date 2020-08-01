import { UIManager, LayoutAnimation, Platform } from 'react-native';

const CONFIG = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    duration: 200,
    property: LayoutAnimation.Properties.opacity
  }
};

export function enableAnimation() {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export function animate() {
  LayoutAnimation.configureNext(CONFIG);
}
export function infoAnimate(infoConfig) {
  LayoutAnimation.configureNext(infoConfig);
}
