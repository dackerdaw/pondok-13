"use client";

import { useEffect, useRef, useState } from "react";
import { MathfieldElement, MathfieldOptions } from "mathlive";

export type MathfieldProps = {
  options?: Partial<MathfieldOptions>;

  value?: string;
  onChange: (latex: string) => void;
  readOnly?: boolean;

  className?: string;
};

const MathInput = (props: MathfieldProps) => {
  const ref = useRef<MathfieldElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    MathfieldElement.soundsDirectory = "/math/sounds"
    const el = ref.current;

    if (el) {
      // el.virtualKeyboardMode = "manual";
      el.onchange = () => setValue(el.value);
      el.readOnly = props.readOnly ?? false
      el.className = props.className || '';
      el.value = props.value ?? '';
    }
  }, [ref]);

  useEffect(() => {
    props.onChange(value)
  }, [value]);

  return (
    <div>
      <math-field
        ref={ref}
      ></math-field>
    </div>
  );
};
export default MathInput;