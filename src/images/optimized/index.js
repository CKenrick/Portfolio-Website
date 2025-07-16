// Auto-generated image optimization index

// Import all profile images as modules so Vite includes them in the build
import profileImgLargeJpg from './profile_img-large.jpg';
import profileImgLargeWebp from './profile_img-large.webp';
import profileImgMediumJpg from './profile_img-medium.jpg';
import profileImgMediumWebp from './profile_img-medium.webp';
import profileImgPlaceholderJpg from './profile_img-placeholder.jpg';
import profileImgSmallJpg from './profile_img-small.jpg';
import profileImgSmallWebp from './profile_img-small.webp';
import profileImgThumbnailJpg from './profile_img-thumbnail.jpg';
import profileImgThumbnailWebp from './profile_img-thumbnail.webp';
import profileImgXlargeJpg from './profile_img-xlarge.jpg';
import profileImgXlargeWebp from './profile_img-xlarge.webp';

export const profileImg = {
  large: {
    jpg: profileImgLargeJpg,
    webp: profileImgLargeWebp,
  },
  medium: {
    jpg: profileImgMediumJpg,
    webp: profileImgMediumWebp,
  },
  placeholder: {
    jpg: profileImgPlaceholderJpg,
    placeholder: () => import('./profile_img-placeholder.js').then(m => m.default),
  },
  small: {
    jpg: profileImgSmallJpg,
    webp: profileImgSmallWebp,
  },
  thumbnail: {
    jpg: profileImgThumbnailJpg,
    webp: profileImgThumbnailWebp,
  },
  xlarge: {
    jpg: profileImgXlargeJpg,
    webp: profileImgXlargeWebp,
  },
};

