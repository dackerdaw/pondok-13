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
            message: "Jawaban kamu belum valid. Pastikan jawabanmu sudah lengkap."
        };
    }
    
    let canonicalAnswer = ce.box(answer.mathJSONCorrectAnswer);
    if (!canonicalAnswer.isValid) {
        throw {
            code: 500,
            message: "Invalid answer from database"
        }
    }
    
    const passed = boxedInput.isEqual(canonicalAnswer)
    if (!passed) {
        throw {
            code: 460,
            message: "Jawabanmu belum sesuai. Kamu bisa melihat petunjuk bila kesulitan."
        }
    }
    
    if (answer.simplify && boxedInput.latex != canonicalAnswer.latex) {
        throw {
            code: 461,
            message: "Jawabanmu sudah benar, namun masih bisa disederhanakan."
        }
    }
    
    return true
}