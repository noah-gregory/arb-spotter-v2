// import { useRef, useState, useEffect} from 'react';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import { Link} from "react-router-dom";




const UploadPage = () => {
    
    return(
        
        (
                <section className='Upload-Holder'>
                    <section className='Image-Holder'>
                        <i className='Image-Icon'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"/></svg></i>
                        <button type='button' className='Upload-Button'><text className="upload-text">Upload Picture</text></button>
                    </section>
                <button type="button"className="location-button">Select Location</button>
                <textarea contentEditable='true'className='Caption-Text' id='CaptionText' type='text'maxLength={50} placeholder="Put Your Caption Here!
                (Max 50 characters)"></textarea>
                <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
                <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
                <input maxLength='9'className='Tag-Button'placeholder="Add Tag"></input>
                <button type="button"className="finalize-button">Upload Post</button>
                </section>
        )
    )
    
}


export default UploadPage
