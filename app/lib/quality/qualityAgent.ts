export function QualityAgent(video: any) {
  let score = 100;

  if (video.voiceQuality < 80) score -= 10;
  if (video.thumbnailCTR < 3) score -= 15;
  if (video.retention < 30) score -= 20;

  return {
    score,
    improveVoice: video.voiceQuality < 80,
    improveThumbnail: video.thumbnailCTR < 3,
    improveScript: video.retention < 30,
  };
}
