const YouTubeEmbed = ({ youtubeUrl }) => {
    const embedUrl = youtubeUrl.replace("watch?v=", "embed/"); // Convert YouTube URL to embed format
  
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
  