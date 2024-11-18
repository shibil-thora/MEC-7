const YouTubeEmbed = ({ youtubeUrl }) => {
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const { hostname, pathname, searchParams } = urlObj;

      if (hostname.includes("youtube.com")) {
        if (pathname === "/watch") {
          return `https://www.youtube.com/embed/${searchParams.get("v")}`;
        }
      } else if (hostname === "youtu.be") {
        return `https://www.youtube.com/embed${pathname}`;
      }

      return null;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return null;
    }
  };

  const embedUrl = getEmbedUrl(youtubeUrl);

  if (!embedUrl) {
    return <p className="text-red-500">Invalid or unsupported YouTube URL</p>;
  }

  return (
    <div className="w-full h-64">
        <iframe
          className="w-full h-full object-cover rounded-lg"
          src={embedUrl}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    
  );
};

export default YouTubeEmbed;
