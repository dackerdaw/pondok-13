"use client";

import { useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";

const MathInput = () => {
  const ref = useRef<MathfieldElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    import("mathlive");
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
        sounds-directory="https://unpkg.com/mathlive@0.84.0/dist/sounds/"
        fonts-directory="https://unpkg.com/mathlive@0.84.0/dist/fonts/"
        ref={ref}
      ></math-field>
    </div>
  );
};
export default MathInput;