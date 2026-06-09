import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import {Link} from "react-router-dom";
// This component will be used to display the post in the home page and the all posts page.
//  It will contain the title and the featured image of the post. It will also be a link to the post details page.
function Postcard(props){
    const { post, $id, title, featuredImage } = props;
    const [previewUrl, setPreviewUrl] = useState("");
    const id = $id || post?.$id;
    const heading = title || post?.title;
    const imageId = featuredImage || post?.featuredImage;

    useEffect(() => {
        let active = true;
        if (imageId) {
            appwriteService.getFilePreview(imageId)
                .then((url) => {
                    if (active) setPreviewUrl(url || "");
                })
                .catch(() => {
                    if (active) setPreviewUrl("");
                });
        } else {
            setPreviewUrl("");
        }
        return () => {
            active = false;
        };
    }, [imageId]);

    return(
        <Link to={`/post/${id}`}>
            <div className="w-full bg-white rounded-xl p-4 shadow-sm transition hover:shadow-md">
                <h2 className="text-lg font-bold text-gray-900 mb-3">{heading}</h2>
                {previewUrl && (
                    <div className="w-full mb-4 overflow-hidden rounded-lg">
                        <img src={previewUrl} alt={heading} className="w-full h-48 object-cover" />
                    </div>
                )}
            </div>
        </Link>
    )
}
export default Postcard;