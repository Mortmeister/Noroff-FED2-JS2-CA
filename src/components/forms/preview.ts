export function updateImagePreview(
  postImageUrl: HTMLInputElement,
  imageURLPreview: HTMLImageElement
) {
  const url = postImageUrl.value.trim();

  if (url && url.startsWith("http")) {
    imageURLPreview.src = url;
    imageURLPreview.style.display = "block";
  } else {
    imageURLPreview.style.display = "none";
  }
}
