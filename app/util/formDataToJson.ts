
function formDataToJson(formData: FormData) {
  return formData.entries().reduce(
    (accumulator, [key, value]) => {
      accumulator[key] = value;
      return accumulator;
    },
    {} as { [key: string]: FormDataEntryValue }
  )
}

export default formDataToJson;
