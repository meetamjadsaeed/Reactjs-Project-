import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { Pagination, Spin, Select, Input } from "antd";
import { LoadingOutlined, AudioOutlined } from "@ant-design/icons";
import AppService from "../../services/appServices";
import ProductCard from "./ProductCard";

const { Search } = Input;

const rowStyle: React.CSSProperties = {
  marginBottom: "16px",
};

const colStyle: React.CSSProperties = {
  marginBottom: "16px",
};

const filtersStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignContent: "space-around",
  justifyContent: "space-around",
  padding: "50px 0px 50px 0px",
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [allCats, setAllCats] = useState<any[]>([]);
  const [cat, setCat] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortable, setSortable] = useState<string>("asc");

  const recordsPerPage: number = 8;

  const getProducts = async () => {
    try {
      setLoading(true);
      const apiResp = await AppService.allProducts();
      const apiRespByCat = await AppService.allProductsByCategory(cat);
      const response = apiResp?.data;
      const responseWithCat = apiRespByCat?.data;

      const products =
        cat !== "All"
          ? responseWithCat?.products || []
          : response?.products || [];

      const sortDesc = sortProductsDescending([...products]);
      const sortAsc = sortProductsAscending([...products]);

      setProducts(
        sortable === "asc" ? sortAsc : sortable === "desc" ? sortDesc : null
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const apiResp = await AppService.allCategories();
      const cat = apiResp?.data?.map((cat: string) => {
        return { value: cat, label: cat };
      });

      setAllCats(cat);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, [sortable, cat]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products?.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortedChange = (value: string) => {
    setSortable(value);
  };

  const handleCategoryChange = (value: string) => {
    setCat(value);
  };

  const sortProductsDescending = (products: any[]) => {
    return products.sort((a, b) => b.id - a.id);
  };

  const sortProductsAscending = (products: any[]) => {
    return products.sort((a, b) => a.id - b.id);
  };

  return (
    <>
      <div style={filtersStyle}>
        <p>Sort</p>
        <Select
          defaultValue="asc"
          style={{ width: 120 }}
          onChange={handleSortedChange}
          options={[
            { value: "asc", label: "ASC" },
            { value: "desc", label: "DESC" },
          ]}
        />
        <p>Categories</p>
        <Select
          defaultValue={cat}
          style={{ width: 120 }}
          onChange={handleCategoryChange}
          options={allCats}
        />
      </div>

      <Row gutter={[16, 16]} style={rowStyle}>
        {loading ? (
          <Spin indicator={antIcon} />
        ) : currentRecords.length > 0 ? (
          currentRecords.map((product: any, index: number) => {
            return (
              <Link to={`/product/${product?.id}`} key={index}>
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  style={colStyle}
                  key={index}
                >
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
          <p>No Records Found</p>
        )}
      </Row>

      {loading ? (
        <Spin indicator={antIcon} />
      ) : currentRecords.length > 0 ? (
        <Pagination
          current={currentPage}
          pageSize={recordsPerPage}
          total={products.length}
          onChange={handlePageChange}
          style={{
            marginTop: "16px",
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            width: "50%",
            margin:"auto"
          }}
        />
      ) : null}
    </>
  );
};

export default Products;
