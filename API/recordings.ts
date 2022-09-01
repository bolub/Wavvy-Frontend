import API from '.';
import { getCookie } from 'cookies-next';
// import { singleGoalProps } from '../utils/GeneralProps';

export const fetchRecordings = async (id: string | number, type: string) => {
  const toFetch = type === 'folder' ? 'custom_folder' : 'tags';

  const response = await API.get(
    `/recordings?filters[$and][0][userId][$eq]=${getCookie(
      'USER_ID'
    )}&filters[$and][1][${toFetch}][id]=${id}&populate=*`
  );

  return response.data.data;
};

export const addRecording = async (data: any) => {
  const response = await API.post(`/recordings`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};

export const updateRecording = async (data: any) => {
  const response = await API.put(`/recordings/${data?.id}`, {
    data: {
      ...data?.data,
    },
  });

  return response.data.data;
};

export const deleteRecording = async (data: { id: string | number }) => {
  const response = await API.delete(`/recordings/${data.id}`);

  return response.data.data;
};
