import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class CloudflareR2Service {
  private readonly s3Client: S3Client;
  private readonly bucketName = process.env.R2_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_KEY_ID,
      },
    });

    console.log('Bucket Name:', this.bucketName);
    console.log('Access Key:', process.env.R2_ACCESS_KEY_ID);
    console.log('Secret Key:', process.env.R2_SECRET_KEY_ID);
  }

  /**
   * Sube un archivo a Cloudflare R2
   * @param key - Nombre del archivo (key)
   * @param file - Archivo que se subirá
   * @returns URL del archivo subido
   */
  async uploadFile(key: string, file: Express.Multer.File): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer, // El archivo en formato buffer
        ContentType: file.mimetype, // Tipo MIME del archivo
      });

      await this.s3Client.send(command);

      // Devuelve la URL pública del archivo subido
      return `https://${this.bucketName}.r2.cloudflarestorage.com/${key}`;
    } catch (error) {
      console.error('Error uploading file to Cloudflare R2:', error);
      throw new Error('File upload failed');
    }
  }
}
