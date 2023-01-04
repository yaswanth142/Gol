import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
@Directive({
    selector: '[confirm2]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmPassDirective,
        multi: true
    }]
})
export class ConfirmPassDirective implements Validator {
    @Input('confirm2') passConfirmEqualValidator: string;
    validate(control: AbstractControl): ValidationErrors | null {
        const controlToCompare = control.root.get(this.passConfirmEqualValidator);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
                subscription.unsubscribe();
            })
        }

        return controlToCompare && controlToCompare.value != control.value ? { 'confirm2': true } : null;
    }
}