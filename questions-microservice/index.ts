import express from "express"
import questions from "./src/paths/questions"
import { setGet } from "./src/PathTypeHelpers"

const app=express()
const port=8080

// paths
setGet(app, "/questions", questions)

// start web server
try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error}`);
}

