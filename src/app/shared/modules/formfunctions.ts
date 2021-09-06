import { IQuestion, loadInformation } from "./question";

export function formAction(action: any, component: any) {
    let question = new IQuestion();
    loadInformation(question, component.questionForm);
    question.id = component.question.id;
    component.store.dispatch(action({question: question}));
    component.router.navigateByUrl('');
  }