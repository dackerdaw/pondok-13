import { ComputeEngine } from "@cortex-js/compute-engine";

export interface MathInputAnswer {
    mathJSONInput: any; // unboxed
    mathJSONCorrectAnswer: any; // unboxed
    simplify: boolean;
    tolerance: number
}

export default function evaluateMathInput(answer: MathInputAnswer) {
    const ce = new ComputeEngine();

    // console.log(`mathjson input: `)
    // console.log(answer.mathJSONInput)
    // console.log(`mathjson correct answer: `)
    // console.log(answer.mathJSONCorrectAnswer)
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
    // console.log(`boxed input: `)
    // console.log(boxedInput)
    // console.log(`is boxed canonical: `)
    // console.log(boxedInput.isCanonical)

    let canonicalAnswer = ce.box(answer.mathJSONCorrectAnswer);
    if (!canonicalAnswer.isValid) {
        return {
            code: 500,
            message: "Invalid answer from database"
        }
    }

    // console.log(`correct boxed answer: `)
    // console.log(canonicalAnswer)
    // console.log(`is correct boxed canonical: `)
    // console.log(canonicalAnswer.isCanonical)

    const passed = boxedInput.isEqual(canonicalAnswer)
    // console.log(`is input correct: ${passed}`)
    if (!passed) {
        return {
            code: 460,
            message: "Jawabanmu belum sesuai. Kamu bisa melihat petunjuk bila kesulitan."
        }
    }
    
    const latexInput = boxedInput.latex
    // console.log(`latexed input: `)
    // console.log(latexInput)

    let latexAnswer = canonicalAnswer.latex
    // console.log(`correct latex answer: `)
    // console.log(latexAnswer)
    
    
    const same = latexInput === latexAnswer
    // console.log(`is input same: ${same}`)

    // results in db should be written as mathjson expression (rational)
    // not pure numerical
    if (answer.simplify) {
        if (boxedInput.isCanonical ||
            same) {
            return {
                code: 200,
                message: "Jawaban kamu benar!"
            }
        } else {
            return {
                code: 461,
                message: "Jawabanmu sudah benar, namun masih bisa disederhanakan."
            }
        }
    }

    return {
        code: 200,
        message: "Jawaban kamu benar!"
    }
}