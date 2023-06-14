import HttpServices from "../httpServices";
import { ENDPOINTS } from "../helpers/endpoints";

class AppService extends HttpServices {
  /* All Products*/
  static allProducts() {
    return this.get(ENDPOINTS.getAllProducts, {});
  }

  /* Single Product*/
  static singleProduct(id) {
    return this.get(`${ENDPOINTS.getSingleProduct}/${id}`, {});
  }

  /* All Categories*/
  static allCategories() {
    return this.get(ENDPOINTS.getAllCategories, {});
  }

  /* All Products By Category*/
  static allProductsByCategory(cat) {
    return this.get(`${ENDPOINTS.allProductsByCategory}/${cat}`, {});
  }

  /* Search Products*/
  static searchProducts(query) {
    return this.get(`${ENDPOINTS.searchProducts}${query}`, {});
  }
}

export default AppService;
