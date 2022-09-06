import { atom } from 'recoil';

export const folderState = atom<any>({
  key: 'folderState',
  default: {},
});

export const allFoldersState = atom<any>({
  key: 'allFoldersState',
  default: [],
});

export const allFolderRecordingsForPlayerState = atom<any>({
  key: 'allFolderRecordingsForPlayerState',
  default: {
    index: 0,
    recordings: [],
  },
});
