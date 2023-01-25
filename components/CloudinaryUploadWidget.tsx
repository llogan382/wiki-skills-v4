import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import Script from 'next/script'

export const SignedUpload = () => {
  const [resource, setResource] = useState();
  return (
    <>

 <CldUploadWidget
  cloudName="lwd-loganwebdev"
uploadPreset="wiki-skills-stage"
        // signatureEndpoint="/api/cloudinary"
        onUpload={(error, result, widget) => {

          setResource(result?.info);
          widget.close();
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            setResource(undefined);
            e.preventDefault();
            open();
          }
          return (
            <button onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      <h3>Unsigned</h3>


      <h3>Signed</h3>

      <p>URL: { resource?.secure_url }</p>
    </>
  )
}
