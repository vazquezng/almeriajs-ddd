import e from 'express';

import { GetSingleOrderQuery } from '../queries/GetSingleOrder.query';

import { isDomainError } from '~app/tools';

interface Deps {
  getSingleOrderQuery: GetSingleOrderQuery;
}

export class GetSingleOrderController {
  constructor(private deps: Deps) {}

  async handle(req: e.Request, res: e.Response) {
    const { orderId } = req.params;

    const order = await this.deps.getSingleOrderQuery.init(orderId).execute();

    if (isDomainError(order)) {
      res.status(400).send(order.message);
    } else {
      res.send(order);
    }
  }
}
