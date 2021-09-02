export function formAction(action: any, component: any) {
    component.question.loadInformation(component.questionForm);
    component.store.dispatch(action({question: component.question}));
    component.router.navigateByUrl('');
  }