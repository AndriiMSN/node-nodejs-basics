import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { MESSAGES } from '../utils.js';

const copy = async () => {
  // Write your code here

  const ORIGINAL_FOLDER = './files';
  const ORIGINAL_FOLDER_URL = new URL(ORIGINAL_FOLDER, import.meta.url);
  const COPY_FOLDER = './files_copy';
  const COPY_FOLDER_URL = new URL(COPY_FOLDER, import.meta.url);

  console.log(ORIGINAL_FOLDER_URL, COPY_FOLDER_URL);

  await Promise.allSettled([
    readdir(ORIGINAL_FOLDER_URL),
    mkdir(COPY_FOLDER_URL, { recursive: true }),
  ]).then(async (result) => {
    if (result[0].status === 'rejected' || result[1].value === undefined) {
      throw Error(MESSAGES.error);
    } else {
      const promises = result[0].value.map((filename) => {
        return copyFile(
          new URL(`${ORIGINAL_FOLDER}/${filename}`, import.meta.url),
          new URL(`${COPY_FOLDER}/${filename}`, import.meta.url),
        );
      });

      await Promise.all(promises);
    }
  });
};

await copy();
