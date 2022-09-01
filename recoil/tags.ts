import { atom } from 'recoil';

export const tagsState = atom<any>({
  key: 'tagsState',
  default: {},
});

export const allTagsState = atom<any>({
  key: 'allTagsState',
  default: {},
});
