"use client";

import { useEffect, useMemo, useRef } from "react";
import {  MathfieldElement, MathfieldOptions } from "mathlive";

export type MathfieldProps = {
  options?: Partial<MathfieldOptions>;
  readOnly?: boolean;

  value: string;
  onChange: (latex: string) => void;

  className?: string;
};

const MathEditor = (props: MathfieldProps) => {
  // `MathfieldElement` works for TS
  const mathFieldRef = useRef<MathfieldElement>(null);
  const mfe = useMemo(() => new MathfieldElement(props.options), []);
  MathfieldElement.soundsDirectory = "/math/sounds"
  
  mfe.readOnly = props.readOnly ?? false;
  const currentValue = useRef('');

  useEffect(() => {
    const container = mathFieldRef.current!!;
    container.innerHTML = '';
    container.appendChild(mfe);
    mfe.className = props.className || '';

    mfe.addEventListener('input', ({ target }) => {
      const value = (target as HTMLInputElement).value || '';
      const promptValues: Record<string, string> = mfe
        .getPrompts()
        .reduce((acc, id) => ({ ...acc, [id]: mfe.getPromptValue(id) }), {});

      if (currentValue.current !== value) {
        currentValue.current = value;
        // props.onChange(value);
      }
    });
  }, []);

  useEffect(() => {
    if (currentValue.current !== props.value) {
      const position = mfe.position;
      mfe.setValue(props.value, { focus: true, feedback: false });
      mfe.position = position;
      currentValue.current = props.value;
    }
  }, [props.value]);

  return (
    <math-field ref={mathFieldRef} style={{ width: '100%' }} />
  );
};

export default MathEditor;