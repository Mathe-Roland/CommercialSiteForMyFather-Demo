export const cloudinaryTransformation = (url, width, height) => {

        const regex = /\/image\/upload\/(.*)\/(.+)/;
        const newUrl = url.replace(regex, `/image/upload/f_auto,w_${width},h_${height}/$2`);
        return  url ? newUrl : "";

};