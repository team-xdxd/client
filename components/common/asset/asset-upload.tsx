import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./asset-upload.module.css";

import toastUtils from "../../../utils/toast";

const AssetUpload = ({
  onFilesDataGet,
  dropEnabled = true,
  inputEnabled = false,
  preDragText = "",
  onDragText = "",
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    readFilesContent(acceptedFiles);
  }, []);

  const readFilesContent = async (files) => {
    const filesPromises = files.map(readFileContent);
    try {
      const filesWithContent = await Promise.all(filesPromises);
      onFilesDataGet(filesWithContent);
    } catch (err) {
      console.log(err);
      toastUtils.error(
        "There was a problem uploading your files, please try again"
      );
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onabort = () => reject(new Error("file reading was aborted"));
      reader.onerror = () => reject(new Error("file reading has failed"));
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        resolve({
          originalFile: file,
          content: binaryStr,
          path: file.path,
          data: {
            name: file.name,
            // path: file.path,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
          },
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: [
    //   "image/png",
    //   "image/jpeg",
    //   "image/gif",
    //   "video/mp4",
    //   "application/pdf",
    // ],
    accept: "image/png, image/jpeg, image/gif, video/mp4, application/pdf",
  });

  const Content = () => (
    <>
      {inputEnabled && <input {...getInputProps()} />}
      {onDragText && (
        <div className={styles["text-wrapper"]}>
          {isDragActive ? (
            <p className={styles.dragged}>{onDragText}</p>
          ) : (
            <p>{preDragText}</p>
          )}
        </div>
      )}
    </>
  );

  return (
    <>
      {dropEnabled ? (
        <div
          className={`${!preDragText ? styles.wrapper : styles.normal} ${
            isDragActive && styles["is-dragging"]
          }`}
          {...getRootProps()}
        >
          <Content />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <Content />
        </div>
      )}
    </>
  );
};

export default AssetUpload;
