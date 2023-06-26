import { ComputeEngine } from "@cortex-js/compute-engine";

export interface MathInputAnswer {
    latexInput: string;
    mathJSONCorrectAnswer: any;
    simplify: boolean;
    tolerance: number
}

export default function evaluateMathInput(answer: MathInputAnswer) {   
    const ce = new ComputeEngine();
    // ce.tolerance = answer.tolerance;
    const boxedInput = ce.parse(answer.latexInput, { canonical: false })
    if (!boxedInput.isValid) {
        throw {
            code: 400,
            message: "Invalid user input"
        };
    }
    console.log("latex input")
    console.log(answer.latexInput)
    console.log("boxed input")
    console.log(boxedInput)
    
    let canonicalAnswer = ce.box(answer.mathJSONCorrectAnswer);
    if (!canonicalAnswer.isValid) {
        throw {
            code: 400,
            message: "Invalid answer from database"
        }
    }
    console.log("mathJSON correct answer")
    console.log(answer.mathJSONCorrectAnswer)
    console.log("boxed correct answer")
    console.log(canonicalAnswer)
    
    const passed = boxedInput.isEqual(canonicalAnswer)
    if (!passed) {
        throw {
            code: 460,
            message: "Wrong answer"
        }
    }
    
    if (answer.simplify && boxedInput.latex != canonicalAnswer.latex) {
        console.log("input latex")
        console.log(boxedInput.latex)
        console.log("answer latex")
        console.log(canonicalAnswer.latex)
        throw {
            code: 461,
            message: "Correct but not simplified"
        }
    }
    
    return true
}