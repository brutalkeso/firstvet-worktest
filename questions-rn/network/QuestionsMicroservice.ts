import { QuestionPages } from "@/shared-types/QuestionsResponse"

class QuestionsMicroservice {
    private paths: {
        questions: string
    }

    constructor(baseUrl: string) {
        this.paths={
            questions: `${baseUrl}/questions`
        }
    }

    questions=() => {
        console.log(this.paths.questions)
        return fetch(this.paths.questions)
            .then(result => {
                if (!result.ok) {
                    throw new Error("Failed to fetch questions")
                }
                return result.json()
            }).then((r) => {
                return new Promise((res, rej) => {
                    setTimeout(() => { res(r) }, 2000)
                })
            })
            .then(j => j as QuestionPages)
    }
}

export default QuestionsMicroservice