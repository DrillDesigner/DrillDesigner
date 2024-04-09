import { message, Upload, Breadcrumb, Layout, Menu, theme, ConfigProvider, Button } from 'antd';
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps, GetProp, UploadProps } from 'antd';

interface MenuComponentProps {
  boxOnClick: () => void;
  saveStateOnClick: () => void;
  loadStateOnClick: () => void;
}

type MenuItem = GetProp<MenuProps, 'items'>[number];

const MenuComponent = (props : MenuComponentProps) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        onClick?: () => void,
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            onClick,
        } as MenuItem;
    }

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

      const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

    const items: MenuItem[] = [
    getItem('Drill Designer', 'designer'),
    getItem('Box', 'box', undefined, undefined, props.boxOnClick),
    getItem('Save state', 'saveState', undefined, undefined, props.saveStateOnClick),
    getItem('Load State', 'loadState', undefined, undefined, props.loadStateOnClick),
    getItem(
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>,
        'link'),
    ];

    return <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={items}/>;
};

export default MenuComponent;