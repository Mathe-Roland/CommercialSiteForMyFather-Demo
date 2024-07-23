export const cloudinaryTransformation = (url, width, height) => {
    const regex = /\/image\/upload\/(.*)\/(.+)/;
    const newUrl = url.replace(regex, `/image/upload/w_${width},h_${height}/$2`);
    return newUrl;
};