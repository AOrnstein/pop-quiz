"use strict";
// Track how many questions were answered correctly
// Global variable per instructions
let score = 0;
let askedQuestions = 0;
class Question {
    prompt;
    answer;
    options;
    constructor(prompt, answer, options) {
        this.prompt = prompt;
        this.answer = answer;
        this.options = options;
    }
    print() {
        let str = this.prompt;
        const strArr = [this.prompt];
        this.options.forEach((value, index) => {
            str += "\n" + `    [${index + 1}] ${value}`;
        });
        return str;
    }
    validateInput(input) {
        if (input === "q" || input === "s") {
            return true;
        }
        const num = Number(input);
        if (Number.isNaN(num)) {
            alert(`Answer must be a number, q to quit, or s to skip`);
            return false;
        }
        if (num < 1 || num > this.options.length) {
            alert(`Answer must be a number from 1 to ${this.options.length}`);
            return false;
        }
        return true;
    }
    ask(questionNumber) {
        askedQuestions++;
        let answerInput = "";
        do {
            answerInput = prompt(`QUESTION ${questionNumber}
${this.print()}

Answer Number (q to quit, s to skip):`);
        } while (!this.validateInput(answerInput));
        if (answerInput === "q") {
            throw new Error("Quit Quiz");
        }
        else if (answerInput === "c") {
            return;
        }
        const answer = Number(answerInput);
        if (this.answer === answer) {
            score++;
        }
    }
}
const questions = [
    new Question("The Answer is one", 1, ["One", "Two", "Three"]),
    new Question("Pick B", 2, ["A", "B", "C", "D"]),
    new Question("Pick D", 4, ["A", "B", "C", "D"]),
    new Question("Pick A", 1, ["A", "B", "C", "D"]),
];
questions.forEach((question, index) => {
    question.ask(index + 1);
});
if (score === 0) {
    alert(`You suck
[${score} / ${askedQuestions}]`);
}
else if (score < askedQuestions) {
    alert(`Meh
[${score} / ${askedQuestions}]`);
}
else {
    alert(`CONGRATS
[${score} / ${askedQuestions}]`);
}
