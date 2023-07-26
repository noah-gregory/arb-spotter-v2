import { useRef, useState, useEffect} from 'react';
import axios from 'axios';
import Resizer from "react-image-file-resizer";
// import jwt_decode from 'jwt-decode';
// import { Link} from "react-router-dom";

const UploadPage = () => {
    const [tag1, setInputTag1] = useState('');
    const [tag2, setInputTag2] = useState('');
    const [tag3, setInputTag3] = useState('');
    const [caption, setCaption] = useState('');

    const app_name = 'arb-navigator-6c93ee5fc546'
    function buildPath(route)
    {
        console.log("Build Path");
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
            );
        });

    // function readAsDataURLAsync(file) {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.onload = () => resolve(reader.result);
    //       reader.onerror = () => reject(reader.error);
    //       reader.readAsDataURL(file);
    //     });
    //   }

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState();
    useEffect(() => {
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // const handleSubmitImage = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     try {
    //     const response = await axios.post(buildPath('api/uploadImage'), formData, {
    //         headers: {
    //         'Content-Type': 'multipart/form-data',
    //         },
    //     });
    //     console.log('File uploaded successfully:', response.data);
    //     } catch (error) {
    //     console.error('Error uploading file:', error);
    //     }
    // };

    const handlePost = async (e) => {
        e.preventDefault();
        var base64Image;
        const formData = new FormData();
        // formData.append('file', file);
        let userDetails = JSON.parse(localStorage.getItem('user_data'));

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        try{
                // Convert the read content to a Base64 string
                const dataURL = await resizeFile(file);
                // console.log(dataURL);
                base64Image = dataURL.split(',')[1];
                // console.log(base64Image); // This is the Base64-encoded image

                console.log("username: " + userDetails.username);
                let obj = {poster:userDetails.username, image:base64Image, caption:caption, tags:[tag1,tag2,tag3]};
                // console.log(obj.image);
            
                // Append the JSON data as a blob to the FormData
                formData.append('json', JSON.stringify(obj));
                // console.log(formData.get('json'));
                const response = await axios.post(buildPath('api/uploadPost'), formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Uploaded post successfully:', response.data);
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };


    return(
        (
            // <section className='Upload-Holder'>
            //     <section className='Image-Holder'>
            //         <form onSubmit={handleSubmitImage}>
            //             <i className='Image-Icon'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/></svg></i>
            //             <input type="file" onChange={handleFileChange}/>
            //             <button type='submit' className='Upload-Button'>Upload</button>
            //         </form>
            //     </section>
            //     <button type="button"className="location-button">Select Location</button>
            //     <textarea contentEditable='true'className='Caption-Text' id='CaptionText' type='text'maxLength={50} placeholder="Put Your Caption Here!
            //     (Max 50 characters)"></textarea>
            //     <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
            //     <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
            //     <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
            //     <button type="button"className="finalize-button">Upload Post</button>
            // </section>

            <section className='Upload-Holder'>
            <section className='Image-Holder'>
                <i className='Image-Icon'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/></svg></i>
                {file && <img className='Image-Preview'src={preview} />}
                <label for="file-upload" class="Upload-Button">Choose Image</label>
                <input type="file" id='file-upload' onChange={handleFileChange}/>
            </section>
            <textarea contentEditable='true'className='Caption-Text' id='CaptionText' onChange={e => setCaption(e.target.value)} required type='text'maxLength={50} placeholder="Put Your Caption Here!
            (Max 50 characters)"></textarea>
            <input maxLength='9'className='Tag-Button'placeholder="Add Tag"value={tag1}onChange={e => setInputTag1(e.target.value)} required></input>
            <input maxLength='9'className='Tag-Button'placeholder="Add Tag"value={tag2}onChange={e => setInputTag2(e.target.value)}></input>
            <input maxLength='9'className='Tag-Button'placeholder="Add Tag"value={tag3}onChange={e => setInputTag3(e.target.value)}></input>
            <button type="button"className="finalize-button"onClick={handlePost}>Upload Post</button>
            </section>
        )
    )
}

export default UploadPage;