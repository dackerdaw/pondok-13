"use client";

import { useEffect, useRef, useState } from "react";
import { MathfieldElement, MathfieldOptions, serializeMathJsonToLatex } from "mathlive";

export type MathfieldProps = {
  options?: Partial<MathfieldOptions>;

  onChange?: any;
  readOnly?: boolean;
  mathJSON?: any;

  className?: string;
};

const MathInput = (props: MathfieldProps) => {
  const ref = useRef<MathfieldElement>(null);
  const [value, setValue] = useState<string>("");
  const [mathJSON, setMathJSON] = useState();

  useEffect(() => {
    MathfieldElement.soundsDirectory = "/math/sounds"
    const el = ref.current;

    if (el) {
      // el.virtualKeyboardMode = "manual";
      el.onchange = () => {
        setValue(el.value);
        setMathJSON(el.expression)
      }
      el.readOnly = props.readOnly ?? false
      el.className = props.className || '';
      el.value = serializeMathJsonToLatex(props.mathJSON)
    }
  }, [ref]);

  useEffect(() => {
    // props.onChange ? props.onChange(mathJSON) : console.log(mathJSON)
    props.onChange ? props.onChange(value) : console.log(value)
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