import QuestionsMicroservice from "../network/QuestionsMicroservice";

// Could potentially have some fallback server hardcoded if you dont trust the release/integration flow
export const questionsMicroservice=new QuestionsMicroservice(process.env.EXPO_PUBLIC_QM_URL!)

const multiple=8

export const Theme={
    Colors: {
        text: "white",
        primary: "blue",
        cta: "green",
        ctaDisabled: "gray"
    },
    /* 
     * Not sure about this, but i thought id try it out. 
     * The thought is to try to keep to the multiples, but if a middle is needed
     * adding A_1 or A_B or something like that, to avoid things like "EXTRA_EXTRA_LARGE" etc.
     */
    Paddings: {
        A: multiple/2,
        B: multiple,
        C: multiple*2,
        D: multiple*3,
        E: multiple*4,
        column: multiple*2
    }
}
