import { useEffect, useState } from "react";
import {  getAllProducts,  getProductByCategory } from "../Api";
import { Badge, Button, Card, Image, List, Rate, Select, Spin, Typography,message } from "antd";
import { useParams } from "react-router-dom";


function Products()
{
    const [loading, setLoading] = useState(false);
    const param = useParams();
 
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az');
   
    
    useEffect(() => {
       setLoading(true);
        (param ?.categoryId ? getProductByCategory(param.categoryId): getAllProducts()).then((res) => 
        {
      console.log(getProductByCategory(param.categoryId));
            setItems(res.products);
            setLoading(false);
           })
    }, [param]);

const getSortedItem = ()  =>
{
    const sortedItems = [...items]
    sortedItems.sort((a, b) =>{
        const aLowerCaseTitle = a.title.toLowerCase(); 
        const bLowerCaseTitle = b.title.toLowerCase(); 
    if(sortOrder ==='az')
    {
        return aLowerCaseTitle> bLowerCaseTitle ? 1:aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
    }
    else if (sortOrder ==='za')
    {
        return aLowerCaseTitle < bLowerCaseTitle ? 1: aLowerCaseTitle === bLowerCaseTitle ? 0 : -1;
    } 
    else if (sortOrder ==='highlow')
    {
        return a.price < b.price ? 1: a.price === b.price ? 0 : -1;
    } 
    else if (sortOrder ==='lowhigh')
    {
        return a.price > b.price ? 1: a.title === b.price ? 0 : -1;
    } 
    })
return sortedItems;}



    if(loading)
    {
        return <Spin spinning/>
    }

    const renderItem = (products, index) => 
    {
return (
    <Badge.Ribbon className = 'itemCardBadge' text= {`${products.discountPercentage}% OFF`} color="pink" >
    <Card className="itemCard"
    title = {products.title}
     key = {index}
      cover= {<Image className="itemCardImage" src={products.thumbnail}
      />}
      actions={[<Rate allowHalf disabled value={products.rating}/>,<AddToCart item={products}/>]}>
        <Card.Meta title = {
        <Typography.Paragraph>
            Price: ${products.price}{" "}
            <Typography.Text delete type="danger">
                ${ parseFloat(products.price +(products.price * products.discountPercentage) / 100).toFixed(2) }
                </Typography.Text>
        </Typography.Paragraph>
        
        }
        description = {<Typography.Paragraph ellipsis= {{rows:2, expandable: true, symbol: 'More'}}>{products.description}</Typography.Paragraph>}>

        </Card.Meta>
    </Card>
    </Badge.Ribbon>
);
    }
    
    return <div className="productContainer">
        <div>
            <Typography.Text>View Items sorted by: </Typography.Text>
            <Select onChange={(value) => setSortOrder(value) }
            defaultValue={"az"}
             options = {[{
                label: "Alphabetically a-z",
                value: 'az'
            },
            {
                label: "Alphabetically z-a",
                value: 'za'
            },
            {
                label: "Price high to low",
                value: 'highlow'
            },
            {
                label: "Price low to high",
                value: 'lowhigh'
            },
            ]}></Select>
        </div>
        <List grid={{column: 3}} renderItem = {renderItem} dataSource={getSortedItem()}></List>
    </div>
}

function AddToCart ({item})

{
    const [loading, setLoading] = useState(false);
    const addProductToCart = ()  =>
    { setLoading(true);
        getProductByCategory(item.id).then((res) => {
            message.success(`${item.title} has been added to cart` );
            setLoading(false);
         })
    }
    return  <Button onClick={() => {addProductToCart()}} type="link" loading ={loading}>Add to cart</Button>
}
export default Products;