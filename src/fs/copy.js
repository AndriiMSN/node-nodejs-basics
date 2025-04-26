import { mkdir, readdir, copyFile, access, constants } from 'node:fs/promises';
import { MESSAGES } from '../utils.js';

const copy = async () => {
    const ORIGINAL_FOLDER = './files';
    const ORIGINAL_FOLDER_URL = new URL(ORIGINAL_FOLDER, import.meta.url);
    const COPY_FOLDER = './files_copy';
    const COPY_FOLDER_URL = new URL(COPY_FOLDER, import.meta.url);

    try {
        await access(ORIGINAL_FOLDER_URL, constants.F_OK);
    } catch {
        throw Error(MESSAGES.error);
    }

    let filesCopyExists = true;
    try {
        await access(COPY_FOLDER_URL, constants.F_OK);
    } catch {
        filesCopyExists = false;
    }

    if (filesCopyExists) {
        throw Error(MESSAGES.error);
    }

    try {
        await mkdir(COPY_FOLDER_URL);
        const files = await readdir(ORIGINAL_FOLDER_URL);
        const promises = files.map((filename) => 
            copyFile(
                new URL(`${ORIGINAL_FOLDER}/${filename}`, import.meta.url),
                new URL(`${COPY_FOLDER}/${filename}`, import.meta.url),
            )
        );
        await Promise.all(promises);
    } catch (e) {
        throw Error(MESSAGES.error);
    }
};

await copy();