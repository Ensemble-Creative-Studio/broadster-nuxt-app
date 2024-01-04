export const query = groq`*[_type == "infos"][0]
  {
    title,
    videoUrl,
    placeholderImage,
    // TODO - Rename sections to blocks in Sanity
    sections,
    history[],
    clients[]
  }
`