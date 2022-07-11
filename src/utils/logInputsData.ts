interface PageData {
  [key: string]: string;
}

export const logInputsData = () => {
  const pageInputs = Array.from(document.querySelectorAll('.input')) as Array<HTMLInputElement>;

  const pageData = pageInputs.reduce((accum: PageData, input: HTMLInputElement) => {
    const inputId = input.id;

    input.focus();
    input.blur();

    if (inputId) {
      return { ...accum, [inputId]: input.value };
    }
    return accum;
  }, {});

  // eslint-disable-next-line no-console
  console.log('pageData: ', pageData);
};
