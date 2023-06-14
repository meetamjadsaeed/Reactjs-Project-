import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import ProductCard from "./ProductCard";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Single: React.FC = () => {
  const [singleProduct, setSingleProduct] = useState<any>();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const getProduct = async (value: any) => {
    try {
      setLoading(true);
      const apiResp = await AppService.singleProduct(value);
      const response = apiResp?.data;
      setSingleProduct(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(paths[1]);
  }, []);

  return (
    <>
      {loading ? (
        <Spin indicator={antIcon} />
      ) : singleProduct !== undefined && singleProduct !== null ? (
        <ProductCard
          productData={{
            id: singleProduct?.id,
            title: singleProduct?.title,
            thumbnail: singleProduct?.thumbnail,
            description: singleProduct?.description,
            price: singleProduct?.price,
            discount: singleProduct?.discountPercentage,
            category: singleProduct?.category,
          }}
        />
      ) : (
        "No data found, please try a different keyword"
      )}
    </>
  );
};

export default Single;
