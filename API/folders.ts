import API from '.';
import { getCookie } from 'cookies-next';
// import { singleGoalProps } from '../utils/GeneralProps';

export const fetchSingleFolder = async (id: string | number) => {
  const response = await API.get(
    `/custom-folders/${id}?filters[userId][$eq]=${getCookie(
      'USER_ID'
    )}&populate=*`
  );

  return response.data.data;
};

export const fetchAllFolders = async () => {
  const response = await API.get(
    `/custom-folders?filters[userId][$eq]=${getCookie('USER_ID')}&populate=*`
  );

  return response.data.data;
};

export const createFolder = async (data: any) => {
  const response = await API.post(`/custom-folders`, {
    data: { ...data },
  });

  return response.data.data;
};

export const updateFolder = async (data: {
  id: string | number;
  body: any;
}) => {
  const response = await API.put(`/custom-folders/${data.id}`, {
    data: { ...data.body },
  });

  return response.data.data;
};

export const deleteFolder = async (data: { id: string | number }) => {
  const response = await API.delete(`/custom-folders/${data.id}`);

  return response.data.data;
};
