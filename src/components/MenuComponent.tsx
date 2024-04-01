import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';

interface MenuComponentProps {
  onClick: any;
}

const MenuComponent = (props : MenuComponentProps) => {
    const items: MenuProps['items'] = [
    {
        label: 'Drill Designer',
        key: 'designer'
    },
    {
        label: 'Box', 
        key: 'box', 
        onClick: () => {
        console.log('Box clicked!');
        // Add your logic here
        }
    },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };


    return <Menu 
            onClick={props.onClick}
            theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={items}/>;
};

export default MenuComponent;