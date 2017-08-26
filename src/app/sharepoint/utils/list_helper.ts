import pnp, { List, ListEnsureResult } from 'sp-pnp-js';

export function createList<T>(list: any) {
    return pnp.sp.web.lists.ensure(list.ListTitle).then((ler: ListEnsureResult) => {

        if (ler.created) {
            let batch = pnp.sp.web.createBatch();
            ler.list.fields.inBatch(batch).addText("ProductNumber");
            ler.list.fields.inBatch(batch).addDateTime("OrderDate");
            ler.list.fields.inBatch(batch).addCurrency("OrderAmount");

            return batch.execute().then(_ => {
                return _;
            });
        }
    });
}