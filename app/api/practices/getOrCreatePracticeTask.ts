import { Practice, ProblemType } from "@/app/api/practices/practice";

export interface Task {
    slug: string;
    done: boolean;
    exerciseLength: number;
    reservedItems: string[];
    reservedItemsCompleted: string[];
    taskType: string;
    timeEstimateLowerBound: number;
    timeEstimateUpperBound: number;
    masteryLevel: string
}

export function getOrCreatePracticeTask(practice: Practice) {
    return practiceToTask(practice);
}

export function practiceToTask(practice: Practice) {
  const problemTypes = practice.expand.problem_types;

  const selectedQuestions = generateAssessmentQuestions(practice.number_of_questions, problemTypes)

  let task: Task = {
    slug: practice.slug,
    done: false,
    exerciseLength: practice.number_of_questions,
    reservedItems: selectedQuestions,
    reservedItemsCompleted: [],
    taskType: "practice",
    timeEstimateLowerBound: practice.time_estimate_lower_bound,
    timeEstimateUpperBound: practice.time_estimate_upper_bound,
    masteryLevel: "unfamiliar",
  };

  return task;
}


function generateAssessmentQuestions(numQuestions: number, problemTypes: ProblemType[]) {
  const numProblemTypes = problemTypes.length
  let selectedQuestions = [];
  console.log(problemTypes)

  // Randomly select one question from each problem type
  // with the assumption that numQuestion >= numProblemTypes
  for (let i = 0; i < numProblemTypes; i++) {

    const problemType = problemTypes[i];
    const questions = problemType.assessment_items;
    const randomIndex = Math.floor(Math.random() * questions.length);

    selectedQuestions.push(questions[randomIndex]);
  }

  // Select remaining questions randomly, avoiding repetitions
  while (selectedQuestions.length < numQuestions) {
    const randomProblemTypeIndex = Math.floor(Math.random() * numProblemTypes);
    const problemType = problemTypes[randomProblemTypeIndex];
    const questions = problemType.assessment_items;
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    const chosenQuestion = questions[randomQuestionIndex]

    // Check if the selected question has already been added
    if (!selectedQuestions.includes(chosenQuestion)) {
      selectedQuestions.push(chosenQuestion);
    }
  }

  return selectedQuestions;
}