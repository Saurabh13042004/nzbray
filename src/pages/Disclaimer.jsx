import React from 'react';
import { FiAlertCircle, FiMail } from 'react-icons/fi';

const Disclaimer = () => {
  return (
    <div className="p-16 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-4">Disclaimer</h2>
      <p className=" mb-4">
        Content provided by this web service. The NZB files downloaded from this service are autogenerated by identifying similar subject lines, posted by the same author, found when scanning Usenet newsgroups. This is not a 100% infallible method and may generate a corrupt NZB file that does not produce the desirable binary content.
      </p>
      <p className=" mb-4">
        The services provided by this service are "as is" with no express or implied warranty for accuracy or accessibility. Errors may occur. This service accepts no responsibility or liability for any incorrect material.
      </p>
      <h3 className="text-2xl font-bold mb-2">Intellectual Property</h3>
      <p className=" mb-4">
        Notice that this service is only providing indexing of files that have been posted on Usenet, and no files can be downloaded from this service. It is not technically possible to identify whether the content of the files, that are being indexed, correspond to the description in the subject, nor is it possible to determine if a file contains copyrighted material.
      </p>
      <p className=" mb-4">
        If you identify a post that you think infringes on your Intellectual Property, please send us an email with the following information:
      </p>
      <ul className="list-disc pl-8 mb-4 ">
        <li>Your name</li>
        <li>Your postal address</li>
        <li>Your telephone number</li>
        <li>Your email address</li>
        <li>A description of why you think the file(s) infringe on your Intellectual Property</li>
        <li>A link in the format: https://example.com/details:xxxxxxxxxxxxxxxxxxxxxxxx/ referencing the Usenet post</li>
      </ul>
      <p className="text-gray-700">
        Any take-down requests that do not contain this information will be ignored.
      </p>
      <div className="flex items-center mt-6 text-red-500">
        <FiAlertCircle className="mr-2" />
        <span>If you believe your Intellectual Property is infringed, contact us at <FiMail className="inline" /> legal@Index...arrr.com</span>
      </div>
    </div>
  );
};

export default Disclaimer;
