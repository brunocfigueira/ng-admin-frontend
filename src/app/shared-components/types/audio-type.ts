export type AudioType = 'audio/mpeg' // Áudio MP3
  | 'audio/ogg' // Áudio Ogg
  | 'audio/wav' // Áudio WAV
  | 'audio/webm' // Áudio WebM;
  | undefined;

export type AudioAttributesSourcesType = {
  name: string,
  description?: string,
  src: string,
  type: AudioType,
}
export type PreloadAttributeType = 'none' | 'metadata' | 'auto'
export type CrossOriginAttributeType = 'anonymous' | 'use-credentials' | undefined
