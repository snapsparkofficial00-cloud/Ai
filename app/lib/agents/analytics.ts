export function AnalyticsAgent(video: any) {
  return {
    views: video.views,
    likes: video.likes,
    retention: video.retention,
    ctr: video.ctr,

    failed:
      video.views < 50 &&
      video.retention < 20,
  };
}
