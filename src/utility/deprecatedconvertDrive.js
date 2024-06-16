export function deprecatedconvertDrive(img = "") {
  // const id = url.substring(url.indexOf("/d/") + 3, url.lastIndexOf("/"));
  // const newStr = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  // return newStr;
  const start = img.indexOf("/d/") + 3;
  const end = img.indexOf("/", start);
  if (start === 2 || end === -1) {
    // Adjusted check for start to account for "/d/" presence
    return img;
  }
  const fileId = img.substring(start, end);
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w10000`;
}
