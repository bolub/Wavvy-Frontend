import API from '.';
import { getCookie } from 'cookies-next';
// import { singleGoalProps } from '../utils/GeneralProps';

export const fetchSingleTag = async (id: string | number) => {
  const response = await API.get(
    `/tags/${id}?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const fetchAllTags = async () => {
  const response = await API.get(
    `/tags?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const createTag = async (data: any) => {
  const response = await API.post(`/tags`, {
    data: { ...data },
  });

  return response.data.data;
};

export const deleteTag = async (data: { id: string | number }) => {
  const response = await API.delete(`/tags/${data.id}`);

  return response.data.data;
};
