import { CldUploadButton } from 'next-cloudinary';
import { useState } from 'react';
import Script from 'next/script'

export const SignedUpload = ({childToParent}) => {
  const [resource, setResource] = useState();
  return (

 <CldUploadButton
  cloudName="lwd-loganwebdev"
uploadPreset="wiki-skills-stage"
        // signatureEndpoint="/api/cloudinary"
        onUpload={(error, result, widget) => {

          setResource(result?.info);
          childToParent(result.secure_url)
          widget.close();
        }}

        onClick={() => childToParent(resource.secure_url)}
      >
        {console.log(resource?.secure_url)}
        </CldUploadButton>

  );

};
