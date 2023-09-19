import { Badge, Drawer, InputNumber, Menu,Table, Button, Form, Input, Checkbox, message } from 'antd';
import {HomeFilled,ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Typography from 'antd/es/typography/Typography';
import { useEffect, useState } from 'react';
import { getCart } from '../Api';

const items = [
  {
    label:<HomeFilled />,
    key: '',
    
  },
  {
    label: 'Men',
    key: 'men',
    children: [
        {
          label:" Men's Shirts",
          key: 'mens-shirts',
        },
        {
          label: "Men's Shoes",
          key: 'mens-shoes',
        },
        {
            label: "Men's Watches",
            key: 'mens-watches',
          },
      ],
 },
  {
    label: 'Women',
    key: 'women',
    children: [
        {
          label:" Women's Jewellery",
          key: 'womens-jewellery',
        },
        {
          label: "Women's Shoes",
          key: 'womens-shoes',
        },
        
        {
            label: "Women's Bags",
            key: 'womens-bags',
          },
          {
            label: "Women's Dresses",
            key: 'womens-dresses',
          },
      ],
    
      },
      {
        label: 'Fragrances',
        key: 'fragrances',
        
          },
      ];

function AppHeader()
{
    const navigate = useNavigate();
    const onMenuClick = (item) => 
    {
navigate(`/${item.key}`);
    }

    return(
      <>
    <div className="header">
        <Menu className='appmenu'
         onClick = { onMenuClick} items={items} mode='horizontal'/>
        <Typography.Title>Maryam's Store</Typography.Title>
        <AppCart/>
       

        
    </div>
    </>);
    function AppCart()
    {
      const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
      const [cartItem, setCartItem] = useState([]);
      const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
      
      
      
      
      useEffect(() =>
      {
        getCart().then(res =>
          {
setCartItem(res.products);
          })
      },[])
      const onConfirmOrder = (values) =>
      {
console.log(values);
setCheckoutDrawerOpen(false);
setCartDrawerOpen(false);
message.success("Your order has been placed successfully");
      }
   
return(
  <div>
     <Badge onClick={() => setCartDrawerOpen(true)} className='shoppingCartIcon' count={cartItem.length}><ShoppingCartOutlined/></Badge>
     <Drawer open={cartDrawerOpen} onClose = {() => setCartDrawerOpen(false)} title = 'your cart'
     contentWrapperStyle={{width:500}}>
      <Table
      pagination= {false}
       columns ={[
        {
        title: "Title",
        dataIndex: 'title'
      },
      {
        title: "Price",
        dataIndex: 'price',
        render: (value) =>
        {
          return <span>${value}</span>
        }
      },
      {
        title: "Quantity",
        dataIndex: 'quantity',
        render: (value, record) =>
        {
          return <InputNumber defaultValue={value}  min={0} 
          onChange= {(value) =>
          {
            setCartItem((pre) => pre.map((cart) => 
            {
                if(record.id === cart.id)
                {
                  cart.total = cart.price * value;
                }
                return cart; 
            }));
           
          }
          
        }
          ></InputNumber>
        }
      },
      {
        title: "Total",
        dataIndex: 'total',
        render: (value) =>
        {
          return <span>${value}</span>
        }
      },
      ]}
      dataSource={cartItem}
      summary={(data) =>
      {
        const total= data.reduce((pre, current) => {
          return pre + current.total;
        },0)
        return <span>Total: {total}</span>
      }} >

      </Table>
      <Button onClick = {()=> setCheckoutDrawerOpen(true)} type="primary">Checkout your cart</Button>
     </Drawer>
     <Drawer open= {checkoutDrawerOpen} onClose={() => setCheckoutDrawerOpen(false)}
     title = "Confirm Order">
      <Form onFinish={onConfirmOrder}>
        <Form.Item rules={
          [
            {
              required: true,
              message: 'Please enter your full name'
            }
        ]
        }
         label = "Full Name" name='full-name'>
          <Input  placeholder='Enter your full name'></Input>
        </Form.Item>
        <Form.Item
        rules={
          [
            {
              required: true,
              type: 'email',
              message: 'Please enter correct email'
            }
        ]
        } label = " Email" name='email'>
          <Input  placeholder='Enter your email ...'></Input>
        </Form.Item>
        <Form.Item 
        rules={
          [
            {
              required: true,
              message: 'Please enter your address'
            }
        ]
        }label = "Address" name='address'>
          <Input  placeholder='Enter your address'></Input>
        </Form.Item>
        <Form.Item>
          <Checkbox defaultChecked disabled>Cash on delivery</Checkbox>
          <Typography.Paragraph type= "secondary">
            More method are coming soon ...</Typography.Paragraph>
        </Form.Item>
        <Button type='primary' htmlType='submit'>Confirm Order</Button>
      </Form>
     </Drawer>
  </div>
);
    }
   
}


export default AppHeader;