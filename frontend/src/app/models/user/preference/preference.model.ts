export interface PreferenceModel {
  theme: string;
}

export class NullPreference implements PreferenceModel {
  public theme: string = null;
}
