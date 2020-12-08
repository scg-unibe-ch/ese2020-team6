
import { Preference, PreferenceAttributes } from '../models/preference.model';

export class PreferenceService {

  public setPreferences(userId: number, preferences: PreferenceAttributes): Promise<Preference> {
    Preference.update(preferences, {
      where: {
        userId: userId
      }
    });
    return Preference.findOne({
      where: {
        userId: userId
      }
    });
  }

  public getPreferences(userId: number): Promise<Preference> {
    return Preference.findOne({
      where: {
        userId: userId
      }
    });
  }

}
