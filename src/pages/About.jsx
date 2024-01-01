import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const About = () => {
  return (
    <div className="p-20 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-4">About Index...arrr</h2>
      <p className="mb-4">
        <strong>Usenet:</strong> Usenet is a decentralized, distributed network of discussion forums that was created in 1979. It operates as a store-and-forward network, which means that messages and files are stored on servers around the world and are available to users 24/7. Usenet started as a way for users to share text-based messages and has evolved into a vast network of discussion groups, newsgroups, and file-sharing communities.
      </p>
      <p className="mb-4">
        Usenet hosts a wide range of discussion groups, or newsgroups, covering various topics, such as politics, technology, and entertainment. It serves as both a platform for discussion and a file-sharing platform, allowing users to upload and download binary files, including music, movies, and software.
      </p>
      <p className="mb-4">
        To access Usenet, users need a Usenet provider, which provides access to servers storing messages and files. Additionally, users require a Usenet client, software enabling them to connect to the Usenet network, search for/download content, and participate in discussions.
      </p>
      <p className="mb-4">
        Despite its decades-long existence, Usenet remains a popular platform, offering privacy, security, and a vibrant community.
      </p>
      <p className="mb-4">
        <strong>NZB Indexing:</strong> Index...arrr is a website functioning as a search engine for Usenet newsgroups. It indexes Usenet content, providing a searchable interface for users. When users find a file for download, Index...arrr generates an NZB file containing the information needed for download. This NZB file can be loaded into a Usenet client like SABnzbd or NZBGet for automatic downloading.
      </p>
      <p className="mb-4">
        It's crucial to note that downloading copyrighted material without permission is illegal in many countries. Using services like Index...arrr for such purposes may lead to legal consequences. These services should only be used for downloading legally obtained content.
      </p>
      <p className="mb-4">
        Index...arrr has been reviewed and rated positively by users for its usability and reliability.
      </p>
      <h3 className="text-2xl font-bold mt-6 mb-2">Other Related Services</h3>
      <p className="mb-4">
        [Add another website name related to Usenet search indexing here]
      </p>
      <h3 className="text-2xl font-bold mt-6 mb-2">Status</h3>
      <p className="mb-4">
        We are currently indexing 3578 Usenet groups, containing 339,114,964 NZBs.
      </p>
      <div className="flex items-center text-green-500">
        <FiCheckCircle className="mr-2" />
        <span>The information on Index...arrr is accurate and up-to-date.</span>
      </div>
    </div>
  );
};

export default About;
