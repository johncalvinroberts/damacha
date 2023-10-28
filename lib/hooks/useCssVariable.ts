import { useEffect, useState } from 'react';
import { useStore } from '../store';

function getCssVariableValue(variableName: string): string | undefined {
  const isServer = typeof window === 'undefined';
  const bodyStyles = isServer ? null : window?.getComputedStyle(document.body);
  return bodyStyles?.getPropertyValue(variableName).trim();
}

function useCssVariable(variableName: string): string | undefined {
  const [value, setValue] = useState<string | undefined>(() =>
    getCssVariableValue(variableName),
  );

  const { theme } = useStore();

  useEffect(() => {
    const nextValue = getCssVariableValue(variableName);
    setValue(nextValue);
  }, [theme, variableName]);

  return value || '';
}

export default useCssVariable;
