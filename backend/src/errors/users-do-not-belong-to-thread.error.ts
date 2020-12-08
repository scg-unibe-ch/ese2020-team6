export class UsersDoNotBelongToThreadError extends Error {
  constructor(messageThreadId: number) {
    super('Users do not belong to the message thread \'' + messageThreadId + '\'');
  }
}
