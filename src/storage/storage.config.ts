const StorageConfig = {
  projectId: process.env.PROJECT_ID,
  keyFilename: `${process.cwd()}/${process.env.CLOUD_STORAGE_KEY}`,
  bucket: process.env.STORAGE_BUCKET,
};

export default StorageConfig;
