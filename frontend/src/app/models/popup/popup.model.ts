export interface PopupModel {
  name: string;
  openTime: number;
  openAnimationTime: number;
  closeAnimationTime: number;
  open(text: string, data: any): Promise<void>;
  close(): Promise<void>;
}
