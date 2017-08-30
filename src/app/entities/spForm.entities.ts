import { FormControl, Validators } from '@angular/forms';

interface IDictionary {
    [key: string]: FormControl;
}

export class SPField {
        idx: number;
        field: string;
        header: string;
        fieldType?: string
        required?: boolean;
        readOnly?: boolean;
        unique?: boolean;
        hidden?: boolean;
        defaultValue?: any;
        maxLength?: number;
        validationFormula?: string;
        validationMessage?: string;
        choices?: string[];
        lookupField?: string;
        lookupList?: string;
        parentList?: string;
        isVirtual?: boolean;
}
export class VisibleColumns {
    field: string;
    header: string;
}

export class SPFields {
    [key: string]: SPField;
}

export class SPModel {
    [key: string]: SPList;
}

export class SPList {
    listName: string;
    listTitle: string;
    items: any[];
}

export class SPForm {
    listName?: string;
    listTitle: string;
    viewName?: string;
    filter?: string;
}

export function getVisibleColumns(data: SPField[]): VisibleColumns[]{
    return data
        .filter(f => { return !f.hidden; })
        .sort((l, r) => { return (l.idx < r.idx) ? -1 : 1 })
        .map(r => {
            return {
                field: r.field,
                header: r.header
            };
        });
}

export function getListFields(data: SPField[]): SPFields {
    let res: SPFields = {};
    data
        .forEach(r => {
            res[r.field] = r;
        });
    return res;
}

export function getFormControls(lf: SPFields): IDictionary{
    let res: IDictionary = {};
    Object.keys(lf).forEach(f => {
        let vld: Validators[] = [];
        if (lf[f].required) vld.push(Validators.required);
        if (lf[f].maxLength) vld.push(Validators.maxLength(lf[f].maxLength));
        res[lf[f].field] = new FormControl(vld);
    });
    return res;
}