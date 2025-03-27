// src/hooks/useHapticNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { HapticType } from '../utils/funcs/hapticFeedback';
import HapticFeedback from '../utils/funcs/hapticFeedback';
import { AppNavigationProp, RootParamList } from '../navigation/rootPramList';

interface HapticNavigationParams<T extends keyof RootParamList> {
  screen: T;
  params?: RootParamList[T];
  hapticType?: HapticType;
}

export function useHapticNavigation() {
  const navigation = useNavigation<AppNavigationProp>();

  const navigateWithHaptic = <T extends keyof RootParamList>({
    screen,
    params,
    hapticType = 'impactLight',
  }: HapticNavigationParams<T>) => {
    HapticFeedback.trigger(hapticType);
    if (params === undefined) {
      navigation.navigate(screen as any);
    } else {
      navigation.navigate(screen as any, params);
    }
  };

  const replaceWithHaptic = <T extends keyof RootParamList>({
    screen,
    params,
    hapticType = 'impactLight',
  }: HapticNavigationParams<T>) => {
    HapticFeedback.trigger(hapticType);
    if (params === undefined) {
      navigation.replace(screen as any);
    } else {
      navigation.replace(screen as any, params);
    }
  };

  const goBackWithHaptic = (hapticType: HapticType = 'impactLight') => {
    HapticFeedback.trigger(hapticType);
    navigation.goBack();
  };

  const resetWithHaptic = (
    state: Parameters<typeof navigation.reset>[0],
    hapticType: HapticType = 'impactLight',
  ) => {
    HapticFeedback.trigger(hapticType);
    navigation.reset(state);
  };

  return {
    navigation,
    navigateWithHaptic,
    replaceWithHaptic,
    goBackWithHaptic,
    resetWithHaptic,
  };
}
