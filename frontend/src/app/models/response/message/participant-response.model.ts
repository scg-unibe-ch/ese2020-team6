import { UserModel, User } from '../../user/user.model';
import { Is } from '../../compare/is';

export interface ParticpantResponseModel {
  user: UserModel;
}

export class ParticipantResponse implements ParticpantResponseModel {

  constructor(
    public user: UserModel
  ) {}

  public static isParticipantResponseModel(participant: ParticpantResponseModel): participant is ParticpantResponseModel {
    return Is.is(participant, ['user']) && User.isUserModel(participant.user);
  }
}
