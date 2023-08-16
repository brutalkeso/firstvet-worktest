import { ServerRequest, ServerResponse } from "../WebServerInterfaces"
import { sendEmptySuccess, sendSuccess } from "../ResponseTypesafety"
import { QuestionInput } from "@/shared-types/QuestionsResponse"

const questions=(req: ServerRequest, res: ServerResponse) => {
    return sendSuccess("a response", res)
}

export default questions