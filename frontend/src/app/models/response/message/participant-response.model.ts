import { UserModel, User } from '../../user/user.model';
import { Is } from '../../compare/is';

export interface ParticpantResponseModel {
  user: UserModel;
  isSeller: boolean;
}

export class ParticipantResponse implements ParticpantResponseModel {

  constructor(
    public user: UserModel,
    public isSeller: boolean
  ) {}

  public static isParticipantResponseModel(participant: ParticpantResponseModel): participant is ParticpantResponseModel {
    return Is.is(participant, ['user', 'isSeller']) && User.isUserModel(participant.user);
  }
}
