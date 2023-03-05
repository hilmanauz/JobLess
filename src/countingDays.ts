const postedTime = (date: string) => {
  const now = new Date();
    const posted = new Date(date);
    const differentTimes = now.getTime() - posted.getTime();
    const differentDays = differentTimes / (1000 * 60 * 60 * 24);
    return {
      days: differentDays,
      times: differentTimes,
    };
}

const postedAt = (posted: {days: number, times: number}) => {
  return posted.days > 365
      ? `${Math.floor(posted.days / 365)} Years ago`
      : posted.days > 28
      ? `${Math.floor(posted.days / 30)} months ago`
      : posted.days > 7
      ? `${Math.floor(posted.days / 7)} weeks ago`
      : posted.days > 1
      ? `${Math.floor(posted.days / 30)} days ago`
      : posted.days === 1
      ? "Yesterday"
      : `${Math.floor(posted.times / (1000 * 60 * 60))} hours ago`
}

export default {
  postedTime,
  postedAt,
};