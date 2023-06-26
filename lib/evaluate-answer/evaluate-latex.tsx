import { ComputeEngine } from "@cortex-js/compute-engine";

export interface MathInputAnswer {
    mathJSONInput: any;
    mathJSONCorrectAnswer: any;
    simplify: boolean;
    tolerance: number
}

export default function evaluateMathInput(answer: MathInputAnswer) {   
    const ce = new ComputeEngine();
    // ce.tolerance = answer.tolerance;
    const boxedInput = ce.box(answer.mathJSONInput, { canonical: false })
    if (!boxedInput.isValid) {
        throw {
            code: 400,
            message: "Invalid user input"
        };
    }
    console.log("mathJSON input")
    console.log(answer.mathJSONInput)
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
    
    if (answer.simplify && !boxedInput.isCanonical) {
        throw {
            code: 461,
            message: "Correct but not simplified"
        }
    }
    
    return true
}