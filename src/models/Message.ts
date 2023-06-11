export default interface IMessage {
  sender: string;
  text: string;
  createdAt: { _seconds: number; _nanoseconds: number };
  conversationId?: string;
}
