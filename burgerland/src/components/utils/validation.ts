import { Rule } from "rc-field-form/lib/interface";

export const requiredField = (validationMessage: string):Rule =>({
    required: true,
    whitespace: true,
    message: validationMessage
})