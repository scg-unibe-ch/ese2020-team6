import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from '../user.service';
import { PreferenceModel } from '../../../models/user/preference/preference.model';
import { environment } from '../../../../environments/environment';
import { LoaderObservable } from '../../service.module';
import { ValueUnloaderCascade } from '../../service.module';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService extends LoaderObservable<PreferenceModel, PreferenceModel> {

  private _source: Observable<PreferenceModel>;

  private loginSuccess = () => this.loadPreferences();
  private valueUnloaderCascade = new ValueUnloaderCascade(
    this.loginSuccess,
    () => {},
    this
  )


  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {
    super();
    this.userService.subscribe(this.valueUnloaderCascade);
  }

  private loadPreferences(): void {
    this.get()
    this.load();
  }

  public update(value: PreferenceModel): void {
    this.set(value);
    this.load();
  }

  public getSource(): Observable<PreferenceModel> {
    return this._source;
  }

  public setSource(source: Observable<PreferenceModel>): Promise<Observable<PreferenceModel>> {
    return Promise.resolve(this._source = source)
  }

  public resetSource(): Promise<void> {
    return new Promise<void>(resolve => {
      this._source = undefined
      resolve();
    })
  }

  protected postProcess(loadedPromise: Promise<PreferenceModel>): Promise<PreferenceModel> {
    return loadedPromise;
  }

  private get(): Promise<PreferenceModel> {
    let preferenceObservable: Observable<PreferenceModel> = this.httpClient.get<PreferenceModel>(environment.endpointURL + 'user/preference/get').pipe(share());
    this.setSource(preferenceObservable)
    return preferenceObservable.toPromise();
  }

  private set(value: PreferenceModel): Promise<PreferenceModel> {
    let preferenceObservable: Observable<PreferenceModel> = this.httpClient.put<PreferenceModel>(environment.endpointURL + 'user/preference/set', value).pipe(share());
    this.setSource(preferenceObservable)
    return preferenceObservable.toPromise();
  }
}
