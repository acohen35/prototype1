import { useLanguage } from '../contexts/LanguageContext';
import { useUnitPreference } from '../contexts/UnitPreferenceContext';

export function useFormatDistance() {
  const { t } = useLanguage();
  const { unit, convertDistance } = useUnitPreference();

  const formatDistance = (distance: number, includeUnit = true): string => {
    const formattedDistance = convertDistance(distance);
    if (!includeUnit) {
      return formattedDistance.split(' ')[0]; // Return just the number
    }
    return formattedDistance;
  };

  const formatDistanceWithText = (distance: number): string => {
    const formattedDistance = formatDistance(distance);
    return `${formattedDistance} ${t('away')}`;
  };

  return {
    formatDistance,
    formatDistanceWithText
  };
}
