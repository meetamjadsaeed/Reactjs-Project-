import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";

import AppService from "../services/appServices";
import ProductCard from "../components/products/ProductCard";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const rowStyle = {
  marginBottom: "16px",
};

const colStyle = {
  marginBottom: "16px",
};

const Search: React.FC = () => {
  const [searchedData, setSearchedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const getSearchedData = async (value: string) => {
    try {
      setLoading(true);
      const apiResp = await AppService.searchProducts(value);
      const searchedResponse = apiResp?.data;
      // console.log(searchedResponse,"searchedResponse")
      setSearchedData(searchedResponse?.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchedData(location.state.querySearch);
  }, [location.state.querySearch]);

  console.log(searchedData, "searchedData");

  return (
    <>
      <h5>Your Results with query: {location.state.querySearch}</h5>
      <Row gutter={[16, 16]} style={rowStyle}>
        {loading ? (
          <Spin indicator={antIcon} />
        ) : searchedData?.length > 0 ? (
          searchedData?.map((product, index) => {
            return (
              <Link to={`/product/${product?.id}`} key={index}>
                <Col xs={24} sm={12} md={8} lg={6} xl={6} style={colStyle}>
                  <ProductCard
                    productData={{
                      id: product?.id,
                      title: product?.title,
                      thumbnail: product?.thumbnail,
                      description: product?.description,
                      price: product?.price,
                      discount: product?.discountPercentage,
                      category: product?.category,
                    }}
                  />
                </Col>
              </Link>
            );
          })
        ) : (
          <p>No data found, please try a different keyword.</p>
        )}
      </Row>
    </>
  );
};

export default Search;
