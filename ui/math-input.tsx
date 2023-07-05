"use client";

import { useEffect, useRef, useState } from "react";
import { MathfieldElement, MathfieldOptions, serializeMathJsonToLatex } from "mathlive";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { ComputeEngine } from "@cortex-js/compute-engine";

export type MathfieldProps = {
  options?: Partial<MathfieldOptions>;
  question: AssessmentItem;

  onChange: any;
  readOnly?: boolean;
  mathJSON?: any;

  className?: string;
};

const MathInput = (props: MathfieldProps) => {
    const ce = new ComputeEngine();
  const ref = useRef<MathfieldElement>(null);
  const [latexValue, setLatexValue] = useState<string>("");
  const [mathJSON, setMathJSON] = useState();

  useEffect(() => {
    MathfieldElement.soundsDirectory = "/math/sounds"
    const el = ref.current;

    if (el) {
      // el.virtualKeyboardMode = "manual";
      el.onchange = () => {
        setLatexValue(el.value);
        setMathJSON(el.expression)
      }
      el.readOnly = props.readOnly ?? false
      el.className = props.className || '';
      el.value = serializeMathJsonToLatex(props.mathJSON)
    }
  }, [ref]);

  useEffect(() => {
    // props.onChange ? props.onChange(mathJSON) : console.log(mathJSON)
    // props.onChange ? props.onChange(latexValue) : console.log(latexValue)
    const resolvedMathJSON = ce.parse(latexValue, { canonical: false })
    props.onChange ? props.onChange(resolvedMathJSON.json) : console.log(resolvedMathJSON)
  }, [latexValue]);
  
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.value = serializeMathJsonToLatex(props.mathJSON)
      setLatexValue('')
      props.onChange('')
    }
  }, [props.question])

  return (
    <div>
      <math-field
        ref={ref}
      ></math-field>
    </div>
  );
};
export default MathInput;