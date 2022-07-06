/**
 * Get cats pictures
 * @param {number} length
 * @returns {Promise<Array<{ title: string, url:string }>}
 */
export const getImages = (length = 10) => {
  return fetch(`https://api.thecatapi.com/v1/breeds`)
    .then((response) => response.json())
    .then((response) => {
      const images = [];
      response.forEach((c) => {
        const title = c?.description;
        const url = c?.image?.url;

        images.push({ title, url });
      });
      return images.slice(0, length); // remove the extra cats
    });
};
