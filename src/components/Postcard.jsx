import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import {Link} from "react-router-dom";
// This component will be used to display the post in the home page and the all posts page.
//  It will contain the title and the featured image of the post. It will also be a link to the post details page.
function Postcard(props){
    const { post, $id, title, featuredImage, content, $createdAt } = props;
    const [previewUrl, setPreviewUrl] = useState("");
    const id = $id || post?.$id;
    const heading = title || post?.title;
    const imageId = featuredImage || post?.featuredImage;
    const plainContent = (content || post?.content || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    const description = plainContent || "A beautiful story from the PIXORA community.";
    const postDate = $createdAt || post?.$createdAt;
    const formattedDate = postDate
        ? new Date(postDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Date unavailable";

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
        <Link to={`/post/${id}`} className="group block h-full">
            <div className="h-full overflow-hidden rounded-lg border border-violet-400/25 bg-[#050b22]/90 shadow-[0_18px_45px_rgba(0,0,0,0.36)] transition duration-500 hover:-translate-y-1 hover:border-violet-300/70 hover:shadow-[0_0_38px_rgba(139,92,246,0.38)]">
                <div className="relative h-44 overflow-hidden">
                    {previewUrl ? (
                        <img src={previewUrl} alt={heading} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-br from-slate-800 via-violet-950 to-slate-950" />
                    )}
                    <span className="absolute bottom-3 left-3 rounded-md bg-gradient-to-r from-violet-700 to-fuchsia-600 px-3 py-1 text-xs font-black text-white shadow-[0_0_20px_rgba(139,92,246,0.55)]">
                        Story
                    </span>
                </div>
                <div className="p-4">
                    <h2 className="line-clamp-2 text-base font-black text-white">{heading}</h2>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{description}</p>
                    <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span className="grid h-4 w-4 place-items-center rounded border border-slate-500 text-[10px] leading-none">D</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default Postcard;
