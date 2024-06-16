// // output = "https://drive.google.com/thumbnail?id=1YC8GefwmrcLEeYsDR8c2ZcbSBCe-vaUE&sz=w10000"
// const url =
//   "https://drive.google.com/file/d/1TzdpLRXSiTQsr1serEnF8JDKenWdEaJp/view?usp=sharing";

// function convertDrive(url = "") {
//   // if()
//   const id = url.substring(url.indexOf("/d/") + 3, url.lastIndexOf("/"));
//   const newStr = `https://drive.google.com/thumbnail?id=${id}&sz=w10000`;
//   console.log(newStr);
// }

// convertDrive(url);
const str =
  '<img src="https://i.ibb.co/ZNFMKnJ/download.jpg" alt="download" border="0">';
function convertImgbb(str = "") {
  return str.split(`"`)[1];
}

console.log(convertImgbb(str));
