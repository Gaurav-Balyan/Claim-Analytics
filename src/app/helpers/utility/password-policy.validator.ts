import { AbstractControl } from '@angular/forms';

  // Regex Creation Guide for password policy
  //  (?=.*?[a-z])              // should contain at least one lower case
  //  (?=.*?[A-Z])              // should contain at least one upper case
  //  (?=.*?[0-9])              // should contain at least one digit
  //  (?=.*?[#?!@$%^&*-])       // should contain at least one special characters
  //  {8,}                      // should contain at least 8 from the mentioned characters

export function ValidatePasswordPolicy(control: AbstractControl) {
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(control.value)) {
        return { validPassword: true };
    }
    return null;
}
