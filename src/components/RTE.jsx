import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";
import conf from "../conf/conf";
import appwriteService from "../appwrite/config";
export default function RTE({name , control , label , defaultValue = ""}){
// This component will be used to create a rich text editor. It will be used to create a rich text editor for the content
//  of the blog post. It will take a prop called name which will be used to set the name of the editor.
//  It will take a prop called control which will be used to control the editor. It will take a prop called label
//  which will be used to set the label of the editor. It will take a prop called defaultValue which will be used to set 
// the default value of the editor.
// it also contain render prop which will be used to render the editor. It will take a prop called onChange which will be
//  used to handle the change event of the editor.here field is destructured to get the onChange function which will be used 
// to handle the change event of the editor.
    return (
        <div className="w-full overflow-hidden rounded-2xl">
            {label && (
                <label className="inline-block mb-2 pl-1 text-sm font-semibold text-slate-200" htmlFor={name}>
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={conf.tinyMCEApiKey}
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            skin: "oxide-dark",
                            content_css: "dark",
                            content_style: "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px; color:#e2e8f0; background:#0f172a; }",
                            images_upload_handler: async (blobInfo) => {
                                const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type });
                                try {
                                    const response = await appwriteService.uploadFile(file);
                                    if (response) {
                                        const imageUrl = await appwriteService.getFilePreview(response.$id);
                                        return imageUrl;
                                    }
                                } catch (error) {
                                    console.error("Image upload error:", error);
                                    throw new Error("Image upload failed");
                                }
                            },
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
} 
