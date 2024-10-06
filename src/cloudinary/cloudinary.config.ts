import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dxs0zrdtr',
      api_key: '126879973764648',
      api_secret: 'PoX-TAhlgnlNbr1FqCFtPpP4n-U',
    });
  },
};
