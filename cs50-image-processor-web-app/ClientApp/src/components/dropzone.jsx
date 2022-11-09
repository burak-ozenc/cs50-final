import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {TiDelete} from 'react-icons/ti'
import {Oval} from "react-loading-icons";

const MAX_FILE_SIZE_LIMIT = 3072000

const DropZone = ({
                      setFormData,
                      image,
                      setImage,
                      name,
                      slug,
                      setImageSizes,
                      setInitialImageSizes,
                      setAspectRatio,
                      setProcessStart,
                      isLoading
                  }) => {
    const [files, setFiles] = useState([]);
    const [previewUrl, setPreviewUrl] = useState();
    const [innerErrorMessage, setInnerErrorMessage] = useState('');

    // get image size props on load
    function handleImage(file) {
        if (!file) {
            return;
        }
        
        const image = new Image();
        
        image.onload = function () {
            let ratio = (this.width / this.height).toFixed(4)
            setAspectRatio(ratio)
            setProcessStart(true)
            setImageSizes({width: this.width, height: this.height})
            setInitialImageSizes({width: this.width, height: this.height})
        }
        let preview = URL.createObjectURL(file);
        setFiles([{
            preview: preview
        }])
        setPreviewUrl(preview)
        image.src = preview;
    };

    // construct props for dropzone library 
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },

        onDrop: (acceptedFile, rejectedFiles) => {
            // clear previous image
            setImage()
            
            // check for errors
            if (rejectedFiles[0]) {
                handleError(rejectedFiles[0].errors[0])
            }
            
            // set Image for request
            setFormData(acceptedFile[0]);
            
            // set preview and get image size
            handleImage(acceptedFile[0]);
        },
        maxSize: MAX_FILE_SIZE_LIMIT,
        maxFiles: 1
    });

    // clear image props on remove
    function removeImage() {
        setFiles([])
        setImage()
        setInitialImageSizes({width: 0, height: 0})
        setImageSizes({width: 0, height: 0})
        setProcessStart(false)
    }

    // handle image errors
    function handleError(error) {
        setInnerErrorMessage(error.message)
    }
    
    useEffect(() => {
        console.log('name',name)
        console.log('slug',slug)
    },[isLoading])
    
    // create image preview 
    const thumbs = files.map((file, i) => (
        <div key={i} className="row">
            <div className="col-md-5 m-2">
                <div className="dropzone-wrapper m-auto" key={file.name}>
                    {previewUrl && <img
                        src={file.preview}
                        className="dropzone-image"
                        onLoad={() => {
                            URL.revokeObjectURL(previewUrl)
                        }}
                    />}
                    <button
                        type="reset"
                        className="delete-icon-wrapper"
                        onClick={() => {
                            removeImage()
                        }}
                    >
                        <TiDelete className="delete-icon"/>
                    </button>
                </div>
            </div>
            <div className="col-md-5 m-2">
                <div className="dropzone-wrapper m-auto d-flex justify-content-center align-items-center">
                    {/* SHOW IMAGE ON AFTER PROCESS HAS FINISHED*/}
                    {image && previewUrl &&
                        <a className="" href={`data:image/${slug.toLowerCase()};base64,${image}`} download={`${name}.${slug.toLowerCase()}`}>
                            {/* IF IMAGE IS LOADING SHOW ANIMATION*/}
                            {isLoading ?
                                <Oval style={{justifyContent: 'center', width: '50px', height: '50px'}}
                                      stroke="#000000"
                                      strokeOpacity={.7}
                                      speed={2}/>
                                :
                                <img src={`data:image/${slug.toLowerCase()};base64,${image}`}
                                     className="dropzone-image"
                                     alt={`test ${slug.toLowerCase()}`}
                                />
                            }
                        </a>
                    }
                </div>
            </div>
        </div>
    ));

    // clear browser memory 
    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    // clear error message after 5 seconds
    useEffect(() => {
        if (innerErrorMessage){
            setTimeout(() => {
                setInnerErrorMessage('')
            },5000)    
        }
    }, [innerErrorMessage,setInnerErrorMessage]);


    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone '})} >
                <p style={{color: 'red'}}>{innerErrorMessage && innerErrorMessage}</p>
                <input type="file" accept="image/*" className="dropzone-container" {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select file.</p>
                <p>You are allowed to process only one file at a time.</p>
                <p>Maximum file size limit is 3MB.</p>
            </div>
            <aside className="container-fluid">
                {thumbs}
            </aside>
        </section>
    );
}

export default DropZone