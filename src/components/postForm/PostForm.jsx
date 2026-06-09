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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
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
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {imagePreviewUrl && (
                    <div className="w-full mb-4">
                        <img
                            src={imagePreviewUrl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;