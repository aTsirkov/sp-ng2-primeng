import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'extractProperty' })
export class ExtractPropertyPipe implements PipeTransform {
    transform(value: any, selector: string): string {
        var res: any;
        if (!selector) {
            throw new Error('missing selector');
        }
        let context = value;
        let rest = selector;

        if (value[selector] instanceof Object) {
            if (value[selector].Title)
                res = context[rest].Title;
            else
                res = context[rest].Id;
        }
        else res = context[rest]; 

        return res;
    }
}