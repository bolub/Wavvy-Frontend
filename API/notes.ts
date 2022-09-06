import API from '.';
import { getCookie } from 'cookies-next';

export const addNote = async (data: any) => {
  const response = await API.post(`/notes`, data);

  return response.data.data;
};

export const updateNote = async (data: any) => {
  const response = await API.put(`/notes/${data?.id}`, {
    data: {
      content: data?.content,
    },
  });

  return response.data.data;
};

export const deleteNote = async (data: { id: string | number }) => {
  const response = await API.delete(`/notes/${data?.id}`);

  return response.data.data;
};

export const deleteRecording = async (data: { id: string | number }) => {
  const response = await API.delete(`/notes/${data.id}`);

  return response.data.data;
};
