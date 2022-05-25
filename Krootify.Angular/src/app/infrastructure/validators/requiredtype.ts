import { AbstractControl, ValidationErrors } from "@angular/forms";

export function requiredFileType(reg: string) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value.fileNames && !control.value.fileNames.toString().match(reg)) {
          return { decimal: true };
        }
        return null;
      };
  }