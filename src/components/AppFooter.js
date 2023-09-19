import Typography from "antd/es/typography/Typography";

function AppFooter()
{
    return<div className="footer">
       <Typography.Link href = "https://www.google.com" target = {'_blank'}>Privacy Policy</Typography.Link>
       <Typography.Link href = "https://www.google.com" target = {'_blank'}>Terms & Conditions</Typography.Link>
       <Typography.Link href = "https://www.google.com" target = {'_blank'}>Return Policy</Typography.Link>
       <Typography.Link href = "tel:+12334" target = {'_blank'}>+123456789</Typography.Link>
    </div>
}

export default AppFooter;