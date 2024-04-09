import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps,  } from 'antd';

interface MenuComponentProps {
  boxOnClick: () => void;
  saveStateOnClick: () => void;
  loadStateOnClick: () => void;
}

const MenuComponent = (props : MenuComponentProps) => {
    function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    ): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
    }


    const items: MenuProps['items'] = [
    {
        label: 'Drill Designer',
        key: 'designer'
    },
    {
        label: 'Box', 
        key: 'box', 
        onClick: props.boxOnClick
    },
    {
        label: 'Save state',
        key: 'saveState',
        onClick: props.saveStateOnClick
    },
    {
        label: 'Load State',
        key: 'loadState',
        onClick: props.loadStateOnClick
    },
    // {
    //   label: 'Upload',
    //   key: 'upload',
    //   content: (
    //     <Upload onChange={props.uploadOnChange}>
    //       <button className="ant-btn">Click to Upload</button>
    //     </Upload>
    //   )
    // }
    ];

    return <Menu 
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={items}/>;
};

export default MenuComponent;