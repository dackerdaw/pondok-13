import { ComputeEngine } from "@cortex-js/compute-engine";

export interface MathInputAnswer {
    latexInput: string;
    validAnswer: string;
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
    
    let canonicalAnswer = ce.parse(answer.validAnswer);
    if (!canonicalAnswer.isValid) {
        throw {
            code: 400,
            message: "Invalid answer from database"
        }
    }
    
    const passed = boxedInput.isEqual(canonicalAnswer)
    if (!passed) {
        throw {
            code: 460,
            message: "Wrong answer"
        }
    }
    
    if (answer.simplify && !boxedInput.isCanonical) {
        throw {
            code: 461,
            message: "Correct but not simplified"
        }
    }
    
    return true
}