export type VideoType =
  | 'video/mp4' // Vídeo MP4
  | 'video/webm' // Vídeo WebM
  | 'video/ogg' // Vídeo Ogg
  | 'video/quicktime' // Vídeo QuickTime
  | 'video/x-msvideo' // Vídeo AVI
  | undefined;

export type VideoAttributesSourcesType = {
  name: string,
  description?: string,
  poster?: string,
  src: string,
  type: VideoType,
}
export type PreloadAttributeType = 'none' | 'metadata' | 'auto';
export type CrossOriginAttributeType = 'anonymous' | 'use-credentials' | undefined;
export type ControlsListAttributeType = 'nodownload' | 'nofullscreen' | 'noremoteplayback';
