import { CutUser, NullCutUser } from 'src/app/models/user/cut-user.model';
import { NoBuyerError, NoSellerError } from 'src/app/models/error/error.module';
import { ParticpantResponseModel } from '../response/response.module';
import { Participant, NullParticipant } from './participant.model';

export interface ParticipantsModel {
  seller: Participant;
  buyers: Array<Participant>;
}

export class Participants implements ParticipantsModel, IterableIterator<Participant> {

  public seller: Participant;
  public buyers: Array<Participant>;
  private participants: Array<Participant>;

  constructor(seller: CutUser, buyers: Array<CutUser>);
  constructor(seller: Participant, buyers: Array<Participant>);
  constructor(seller: Participant | CutUser, buyers: Array<Participant | CutUser>) {
    if (buyers.length === 0) throw new NoBuyerError();
    if (!(seller)) throw new NoSellerError();
    if (seller instanceof CutUser) {
      this.buyers = (buyers as Array<CutUser>).map((participant: CutUser) => new Participant(participant));
      this.seller = new Participant(seller as CutUser, true);
    } else {
      this.buyers = buyers as Array<Participant>;
      this.seller = seller as Participant;
    }
    this.participants = this.buyers.concat(this.seller);
  }

  public find(participantOrId: Participant | CutUser | number): Participant {
    let finder = Participants.finder(participantOrId);
    return this.participants.find(finder);
  }

  public indexOf(participantOrId: Participant | CutUser | number): number {
    let finder = Participants.finder(participantOrId);
    return this.participants.findIndex(finder);
  }

  public omit(participantOrId: Participant | CutUser | number): Array<Participant> {
    let participantsCopy: Array<Participant> = Object.assign([], this.participants);
    let participantIndex: number = this.indexOf(participantOrId);
    if (participantIndex >= 0) {
      participantsCopy.splice(participantIndex, 1);
      return participantsCopy;
    } else return new Array<Participant>();
  }

  public next(): IteratorResult<Participant> {
    return this.participants[Symbol.iterator]().next();
  }

  [Symbol.iterator](): IterableIterator<Participant> {
    return this.participants[Symbol.iterator]();
  }

  public map(callback: (currentValue: Participant, index?: number, array?: Array<Participant>) => any, thisArg?: any): Array<any> {
    if (thisArg) return this.participants.map(callback, thisArg);
    else return this.participants.map(callback);
  }

  private static finder(participantOrId: Participant | CutUser | number) {
    let userId = Participants.userId(participantOrId);
    return (participant: Participant) => participant.user.userId === userId;
  }

  private static userId(participantOrId: Participant | CutUser | number) {
    let userId: number;
    if (participantOrId instanceof Participant) userId = (participantOrId as Participant).user.userId;
    else if (participantOrId instanceof CutUser) userId = (participantOrId as CutUser).userId;
    else userId = participantOrId as number;
    return userId;
  }

  public static buildFromParticipantsResponseModel(participants: Array<ParticpantResponseModel>): Participants {
    if (!(participants instanceof Participants)) {
      let participantsArray: Array<Participant> = participants.map((participant: ParticpantResponseModel) => Participant.buildFromParticipantResponseModel(participant));
      let sellerIndex: number = participantsArray.findIndex((participant: Participant) => participant.isSeller);
      let seller: Participant = participantsArray[sellerIndex];
      participantsArray.splice(sellerIndex, 1)

      return new Participants(seller, participantsArray);
    } else return participants;
  }

}

export class NullParticipants extends Participants {
  private static _instance: NullParticipants;

  constructor() {
    super(NullParticipant.instance(), [NullParticipant.instance()]);
  }

  public static instance(): NullParticipants {
    if (!NullParticipants._instance) NullParticipants._instance = new NullParticipants();
    return NullParticipants._instance;
  }

}
