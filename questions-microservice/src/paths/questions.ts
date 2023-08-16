import { ServerRequest, ServerResponse } from "../WebServerInterfaces"
import { sendEmptySuccess, sendSuccess } from "../ResponseTypesafety"
import { mockQuestions } from "./QuestionsData"

const questions=(req: ServerRequest, res: ServerResponse) => {
    return sendSuccess(mockQuestions, res)
}

export default questions