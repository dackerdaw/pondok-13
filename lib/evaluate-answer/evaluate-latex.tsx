import { ComputeEngine } from "@cortex-js/compute-engine";

export interface MathInputAnswer {
    mathJSONInput: any; // unboxed
    mathJSONCorrectAnswer: any; // unboxed
    simplify: boolean;
    tolerance: number
}

export default function evaluateMathInput(answer: MathInputAnswer) {   
    const ce = new ComputeEngine();
    // ce.tolerance = answer.tolerance;
    if (!answer.mathJSONInput) {
        return {
            code: 400,
            message: "Jawaban kamu belum valid. Pastikan jawabanmu sudah lengkap."
        };
    }
    const boxedInput = ce.box(answer.mathJSONInput, { canonical: false })
    if (!boxedInput.isValid) {
        return {
            code: 400,
            message: "Jawaban kamu belum valid. Pastikan jawabanmu sudah lengkap."
        };
    }
    
    let canonicalAnswer = ce.box(answer.mathJSONCorrectAnswer);
    if (!canonicalAnswer.isValid) {
        return {
            code: 500,
            message: "Invalid answer from database"
        }
    }
    
    const passed = boxedInput.isEqual(canonicalAnswer)
    if (!passed) {
        return {
            code: 460,
            message: "Jawabanmu belum sesuai. Kamu bisa melihat petunjuk bila kesulitan."
        }
    }
    
    if (answer.simplify && !boxedInput.isCanonical) {
        return {
            code: 461,
            message: "Jawabanmu sudah benar, namun masih bisa disederhanakan."
        }
    }
    
    return {
      code: 200,
      message: "Jawaban kamu benar!"
    }
}