import { Storage } from '@google-cloud/storage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import StorageConfig from './storage.config';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    const { projectId, keyFilename, bucket } = StorageConfig;

    this.storage = new Storage({
      projectId,
      keyFilename,
    });

    this.bucket = bucket;
  }

  async save(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
  ): Promise<void> {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on('error', async (error) => {
      throw new InternalServerErrorException(error);
    });
    stream.on('finish', async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media);
  }

  getPublicUrl(path: string) {
    return `https://storage.googleapis.com/${this.bucket}/${path}`;
  }
}
