import { chatInstance } from './axios';

const reviewerId = 101;

export const postCreateChatRoom = async (
  questionerId: number,
  qnaTitle: string,
) => {
  const response = await chatInstance.post(`/chat-rooms`, {
    questionerId,
    reviewerId,
    qnaTitle,
  });

  return response;
};

export const getChatListById = async ({ pageParam = 0 }, id: string) => {
  const response = await chatInstance
    .get(`/chat-rooms/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { chatList: response.data, pageInfo: response };
};

export const getChatMessageById = async ({ pageParam = 0 }, id: string) => {
  const response = await chatInstance
    .get(`/chat-messages/${id}?page=${pageParam}`)
    .then((response) => response.data);

  return { previousMessage: response.data, pageInfo: response };
};

export const patchChatAnsweredById = async (chatRoomId: string) => {
  const response = await chatInstance.patch(`/chat-rooms/qna-answer-renewal`, {
    chatRoomId,
    senderId: reviewerId,
  });

  return response;
};

export const sendAnsweredById = async (
  chatRoomId: string,
  questionerId: string,
  mailSubject: string,
) => {
  const response = await chatInstance.post(`/emails/qna-answer`, {
    chatRoomId,
    questionerId,
    mailSubject,
  });

  return response;
};
