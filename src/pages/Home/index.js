import React, { useEffect, useState } from 'react';
import { imageDb } from './config.js';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
function Home() {
    const [img, setImg] = useState('');
    const [imgUrl, setImgUrl] = useState([]);

    const handleClick = () => {
        if (img !== null) {
            console.log(img);
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then(value => {
                console.log(value);
                getDownloadURL(value.ref).then(url => {
                    setImgUrl(data => [...data, url])
                    console.log(url);
                })
            });
        }
    }
    useEffect(() => {
        listAll(ref(imageDb, "files")).then(imgs => {
            //console.log(imgs);
            imgs.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setImgUrl(data => [...data, url])
                })

            });
        })
    }, [])
    return (
        <>
            <div>
                <input type="file" onChange={(e) => {
                    console.log(e);
                    setImg(e.target.files[0]);
                    console.log(e.target.files[0]);
                }} />
                <button onClick={handleClick}>Upload</button>
                <br />
                {
                    imgUrl.map(dataVal => <div>
                        <img src={dataVal} height="200px" width="200px" />
                        <br />
                    </div>)
                }
            </div>


        </>
    )
}
export default Home;


// import React, { useState } from 'react';
// import { PlusOutlined } from '@ant-design/icons';
// import { Modal, Upload } from 'antd';
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// const Home = () => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [previewTitle, setPreviewTitle] = useState('');
//   const [fileList, setFileList] = useState([
//     {
//       uid: '-1',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-2',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-3',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-4',
//       name: 'image.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-xxx',
//       percent: 50,
//       name: 'image.png',
//       status: 'uploading',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-5',
//       name: 'image.png',
//       status: 'error',
//     },
//   ]);
//   const handleCancel = () => setPreviewOpen(false);
//   const handlePreview = async (file) => {
//     console.log(file);
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
//   };
//   const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div
//         style={{
//           marginTop: 8,
//         }}
//       >
//         Upload
//       </div>
//     </div>
//   );
//   return (
//     <>
//       <Upload
//         action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 8 ? null : uploadButton}
//       </Upload>
//       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//         <img
//           alt="example"
//           style={{
//             width: '100%',
//           }}
//           src={previewImage}
//         />
//       </Modal>
//     </>
//   );
// };
// export default Home;


// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Upload } from 'antd';
// const props = {
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   onChange({ file, fileList }) {
//     if (file.status !== 'uploading') {
//       console.log(file, fileList);
//     }
//   },
//   defaultFileList: [
    
//   ],
// };
// const Home = () => (
//   <Upload {...props}>
//     <Button icon={<UploadOutlined />}>Upload</Button>
//   </Upload>
// );
// export default Home;