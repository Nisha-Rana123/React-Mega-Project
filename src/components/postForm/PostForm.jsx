import React , {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button , Input , Select , RTE} from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";


// This component will be used to display the form to create a new post and edit the existing post.
//  It will contain the input fields for the title, content, slug, status and the featured image.
//  It will also contain a button to submit the form. If the post is being edited, it will prefill the
//  input fields with the existing data of the post.
 function PostForm({post}){
  const {register , handleSubmit , watch , setValue , control, getValues} = useForm({
    defaultValues : {
        title: post?.title || '',
        content: post?.content || '',
        slug: post?.slug || '',
        status: post?.status || 'active',
  },});
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const selectedImage = watch("image");

  useEffect(() => {
    let active = true;
    if (post?.featuredImage) {
      appwriteService.getFilePreview(post.featuredImage)
        .then((url) => {
          if (active) setImagePreviewUrl(url || "");
        })
        .catch(() => {
          if (active) setImagePreviewUrl("");
        });
    } else {
      setImagePreviewUrl("");
    }
    return () => {
      active = false;
    };
  }, [post]);

  useEffect(() => {
    const file = selectedImage?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedImage]);

const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                data.featuredImage = file.$id;
            }
            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

//slug Transformation
const slugTransform = useCallback((value) => {
    if(value && typeof value === "string") return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
        return''
})
React.useEffect(()=>{

   const subscription = watch((value , {name})=>{
     if (name==="title"){
      setValue('slug', slugTransform(value.title) , {shouldValidate : true})
     }
   })

 return()=>{
  subscription.unsubscribe()
 }
},[watch , slugTransform , setValue ])
   return (
        <form onSubmit={handleSubmit(submit)} className="grid gap-6 rounded-3xl border border-violet-400/20 bg-[#1E293B]/60 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div>
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 shadow-inner shadow-violet-950/20">
                <div className="mb-4 rounded-3xl border border-dashed border-violet-300/30 bg-violet-500/5 p-4 text-center transition hover:border-violet-300/70 hover:bg-violet-500/10">
                    <Input
                        label="Featured Image :"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image")}
                    />
                    <p className="mt-3 text-xs text-slate-400">Upload a cinematic cover image for your PIXORA story.</p>
                </div>
                {imagePreviewUrl && (
                    <div className="mb-4 w-full overflow-hidden rounded-2xl border border-violet-300/20">
                        <img
                            src={imagePreviewUrl}
                            alt={post?.title || "Featured preview"}
                            className="h-56 w-full object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor="bg-gradient-to-r from-fuchsia-500 to-violet-600" className="w-full">
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
