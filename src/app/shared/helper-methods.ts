export class HelperMethods {
    isValueEmpty(value: any): boolean {
        return !value || value === '' || value === null || value === undefined;
    }

    validateForm(form: Form[]): boolean {
        let isValid: boolean = true;

        form.forEach((element: any) => {
            if (this.isValueEmpty(element)) {
                isValid = false;
            }
        });

        return isValid;
    }
}

export interface Form {
    name: string;
    value: any;
    invalid: boolean;
    invalidMessage?: string;
}
