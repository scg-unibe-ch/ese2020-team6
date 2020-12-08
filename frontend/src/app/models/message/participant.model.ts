import { CutUser, NullCutUser } from 'src/app/models/user/cut-user.model';
import { ParticpantResponseModel } from '../response/response.module';


export interface ParticipantModel {
  user: CutUser;
  isSeller: boolean;
}

export class Participant implements ParticipantModel {

  public isSeller: boolean = false;

  constructor(
    public user: CutUser,
    isSeller?: boolean
  ) {
    if (isSeller === true || isSeller === false) this.isSeller = isSeller;
  }

  public static buildFromParticipantResponseModel(participant: ParticpantResponseModel): Participant {
    if (!(participant instanceof Participant)) {
      return new Participant(
        CutUser.buildFromCutUserModel(participant.user),
        participant.isSeller
      )
    } else return participant;
  }
}

export class NullParticipant extends Participant {
  private static _instance: NullParticipant;

  constructor() {
    super(NullCutUser.instance());
  }

  public static instance(): NullParticipant {
    if (!NullParticipant._instance) NullParticipant._instance = new NullParticipant();
    return NullParticipant._instance;
  }

}
