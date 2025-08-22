import React from "react";

interface Props {
  id: string;
  maxWidth?: string; // ej. "560px", "720px", "100%"
}

export default function YouTube({ id, maxWidth = "640px" }: Props) {
  return (
    <div
      style={{
        maxWidth,
        margin: "1rem auto",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          border: 0,
          display: "block",
        }}
      />
    </div>
  );
}
