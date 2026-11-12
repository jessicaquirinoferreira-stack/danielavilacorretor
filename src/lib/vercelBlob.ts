import { PropertyMedia } from '../types';

export interface UploadProgressCallback {
  (percentage: number, fileName: string): void;
}

/**
 * Handles media uploads for photos and videos.
 * Designed for seamless compatibility with Vercel Blob in production,
 * and high-fidelity base64/ObjectUrl persistence in development.
 */
export async function uploadMediaFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<PropertyMedia> {
  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name);
  const mediaType: 'image' | 'video' = isVideo ? 'video' : 'image';
  const mediaId = 'media_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);

  // If a server endpoint /api/upload exists (e.g., Vercel Serverless Function with @vercel/blob)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.url) {
        if (onProgress) onProgress(100);
        return {
          id: mediaId,
          url: data.url,
          type: mediaType,
          caption: file.name,
        };
      }
    }
  } catch {
    // Fall back to client-side data conversion
  }

  // Client-side fallback: Convert to data URL for persistent client storage and preview
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve({
        id: mediaId,
        url: reader.result as string,
        type: mediaType,
        caption: file.name,
      });
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Batch upload multiple photos and videos
 */
export async function uploadMultipleMedia(
  files: File[],
  onOverallProgress?: (overallPercent: number, currentFileName: string) => void
): Promise<PropertyMedia[]> {
  const results: PropertyMedia[] = [];
  const total = files.length;

  for (let i = 0; i < total; i++) {
    const file = files[i];
    const item = await uploadMediaFile(file, (percent) => {
      if (onOverallProgress) {
        const overall = Math.round(((i + percent / 100) / total) * 100);
        onOverallProgress(overall, file.name);
      }
    });
    results.push(item);
  }

  return results;
}
