import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getAllProductAPI } from "../../../service/dbLogic";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Pagination from "../Common/Pagination";
import Product from "./Product";

const Products = ({ no, logout, isLogin }) => {
  const [products, setProducts] = useState([]);

  /**************** 페이지네이션 선언 ********************/
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 페이징, 정렬, 카테고라이징
  const [category, setCategory] = useState("생리대");
  const [sort, setSort] = useState("name");

  // 모든 상품 불러오기
  const getProduct = async () => {
    const data = {
      page: page,
      category: category,
      sort: sort,
    };

    console.log("getProduct", data);
    await getAllProductAPI(data).then((res) => {
      if (res.data === null) {
        return () => {};
      } else {
        setProducts(res.data);
      }
    });
  };

  const categoryHandler = (e) => {
    setCategory(e.target.innerText);
  };

  const sortHandler = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    getProduct();
  }, [category, sort]);

  useEffect(() => {
    console.log("useEffet 호출");
    getProduct();
  }, []);

  return (
    <>
      <Header logout={logout} isLogin={isLogin} />
      <div className="body_container">
        <div className="product_list_category_btn">
          {/*           <button className="product_btn" onClick={categoryHandler}>
            전체보기
          </button>{" "}
          &nbsp; */}
          <button className="product_btn" onClick={categoryHandler}>
            생리대
          </button>{" "}
          &nbsp;
          <button className="product_btn" onClick={categoryHandler}>
            탐폰
          </button>{" "}
          &nbsp;
          <button className="product_btn" onClick={categoryHandler}>
            기타
          </button>
        </div>
        <div className="proudct_list_sorting">
          <Form.Select size="sm" onChange={sortHandler} defaultValue="name">
            <option value="name">이름순</option>
            <option value="price">낮은가격순</option>
          </Form.Select>
        </div>
        <br />
        <div className="product_list_wrap">
          {products && products.length > 0
            ? products.slice(offset, offset + limit).map((p) => (
                <div className="product_list" key={p.mdNo}>
                  <Product p={p} no={no} logout={logout} isLogin={isLogin} />
                </div>
              ))
            : "상품 준비 중"}
        </div>
        <Pagination
          total={products.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
      <Footer />
    </>
  );
};

export default Products;
