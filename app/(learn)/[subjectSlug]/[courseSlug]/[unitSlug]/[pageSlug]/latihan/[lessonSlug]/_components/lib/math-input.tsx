"use client";

import { useEffect, useRef, useState } from "react";
import { MathfieldElement } from "mathlive";

const MathInput = () => {
  const ref = useRef<MathfieldElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    import("mathlive");
    MathfieldElement.soundsDirectory = "/math/sounds"
  }, []);

  useEffect(() => {
    console.log(ref.current);
    const el = ref.current;
    if (el) {
      // el.virtualKeyboardMode = "manual";
      el.onchange = () => setValue(el.value);
    }
  }, [ref]);

  useEffect(() => {
    console.log(value);
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