import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

interface ProductData {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  discount: number;
  category: string;
}

interface ProductCardProps {
  productData: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ productData }) => {
  const { id, title, thumbnail, description, price, discount, category } =
    productData;
  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src={thumbnail && thumbnail}
            width={100}
            height={200}
          />
        }
      >
        <Meta
          title={title && title}
          description={description && description?.slice(0, 20)}
        />
        <h5>Price: {price && price}</h5>
        <h5>Discount: {discount && discount}%</h5>
        <h5>Category: {category && category}</h5>
      </Card>
    </>
  );
};

export default ProductCard;
