import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
@Directive({
    selector: '[confirmnew]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmNewpassDirective,
        multi: true
    }]
})
export class ConfirmNewpassDirective implements Validator {
    @Input('confirmnew') newpassConfirmEqualValidator: string;
    validate(control: AbstractControl): ValidationErrors | null {
        const controlToCompare = control.root.get(this.newpassConfirmEqualValidator);
        if (controlToCompare) {
            const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
                control.updateValueAndValidity();
                subscription.unsubscribe();
            })
        }

        return controlToCompare && controlToCompare.value != control.value ? { 'confirmnew': true } : null;
    }
}