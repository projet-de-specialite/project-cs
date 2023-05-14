export default interface IMessage {
  sender: string;
  text: string;
  createdAt: number;
  conversationId?: string;
}
