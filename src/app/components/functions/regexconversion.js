export const cloudinaryTransformation = (url, width, height) => {
    if(url){

        const regex = /\/image\/upload\/(.*)\/(.+)/;
        const newUrl = url.replace(regex, `/image/upload/f_auto,w_${width},h_${height}/$2`);
        return newUrl;

    }

    return "";
};