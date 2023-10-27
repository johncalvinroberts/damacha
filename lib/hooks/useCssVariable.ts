import { useEffect, useState } from 'react';

function getCssVariableValue(variableName: string): string | undefined {
  const isServer = typeof window === 'undefined';
  const bodyStyles = isServer ? null : window?.getComputedStyle(document.body);
  return bodyStyles?.getPropertyValue(variableName).trim();
}

function useCssVariable(variableName: string): string | undefined {
  const [value, setValue] = useState<string | undefined>(() =>
    getCssVariableValue(variableName),
  );

  useEffect(() => {
    const updateValue = () => {
      const newValue = getCssVariableValue(variableName);
      if (newValue !== value) {
        setValue(newValue);
      }
    };

    updateValue(); // Initial update

    window.addEventListener('resize', updateValue); // Listen for changes on window resize......wtf

    return () => {
      window.removeEventListener('resize', updateValue); // Clean up the event listener
    };
  }, [variableName, value]);

  return value || '';
}

export default useCssVariable;
