import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  editData = null,
  viewData = null,
  video = false,
}) => {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);

  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      console.log("Hi Im under the water")
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
      
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name,{required:true});
  }, [register]);

  useEffect(() => {
    setValue(name,selectedFile);
  }, [selectedFile,setValue]);

  return (

    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sub className="text-pink-200">*</sub>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt={"Preview"}
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <video aspectRatio="16:9" src={previewSource} autoPlay={true} muted={true} controls={true}/>
            )}
            {!viewData && (
              <button
                type="submit"
                className="mt-3 text-richblack-400 underline"
                onClick={() => {
                  setPreviewSource(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex w-full flex-col items-center p-6"
          >
            <input {...getInputProps} ref={inputRef}  className="hidden" />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50"/>
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and Drop on {!video ? "Image" : "Video"} or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      { errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
      
    </div>
    
  );
};

export default Upload;
