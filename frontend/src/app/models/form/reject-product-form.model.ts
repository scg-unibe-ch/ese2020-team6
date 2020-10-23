export interface RejectProductFormModel {
  reason: string;
}

export class NullRejectProductForm implements RejectProductFormModel {
  reason: string = null;
}
