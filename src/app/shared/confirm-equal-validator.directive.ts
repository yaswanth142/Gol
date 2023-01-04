import { Validator, NG_VALIDATORS, AbstractControl,ValidationErrors } from "@angular/forms";
import { Directive, Input } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
@Directive({
selector:'[confirm]',
providers:[{
    provide:NG_VALIDATORS,
    useExisting:ConfirmEqualValidatorDirective,
    multi:true
}]

})
export class ConfirmEqualValidatorDirective implements Validator{
@Input('confirm') appConfirmEqualValidator:string;
validate(control:AbstractControl): ValidationErrors | null{
    const controlToCompare = control.root.get(this.appConfirmEqualValidator);
    if(controlToCompare){
        const subscription:Subscription=controlToCompare.valueChanges.subscribe(()=>{
            control.updateValueAndValidity();
            subscription.unsubscribe();
        })
    }
    
return controlToCompare && controlToCompare.value !=control.value?{'confirm':true}:null;
}
}