import QuestionsMicroservice from "../network/QuestionsMicroservice";

// Could potentially have some fallback server hardcoded if you dont trust the release/integration flow
export const questionsMicroservice=new QuestionsMicroservice(process.env.EXPO_PUBLIC_QM_URL!)
