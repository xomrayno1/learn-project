
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import BrandList from "views/Brand/BrandList"
import CategoryList from 'views/Category/CategoryList'
import SupplierList from 'views/Supplier/SupplierList'
import ProductList from 'views/Product/ProductList'
import GoodReceiptList from 'views/Goods-Receipt/GoodReceiptList'
import GoodReceiptForm from 'views/Goods-Receipt/GoodReceiptForm'
 

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
    display: true
  },{
    path: "/goods-receipt",
    name: "Nhập hàng",
    icon: "tim-icons icon-cloud-upload-94",
    component: GoodReceiptList,
    layout: "/admin",
    display: true
  },{
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
    display: true
  },{
    path: "/brands",
    name: "Danh sách nhãn hiệu",
    icon: "tim-icons icon-book-bookmark",
    component: BrandList,
    layout: "/admin",
    display: true
  },{
    path: "/categories",
    name: "Danh sách danh mục",
    icon: "tim-icons icon-puzzle-10",
    component: CategoryList,
    layout: "/admin",
    display: true
  },{
    path: "/suppliers",
    name: "Danh sách nhà cung cấp",
    icon: "tim-icons icon-delivery-fast",
    component: SupplierList,
    layout: "/admin",
    display: true
  },{
    path: "/products",
    name: "Danh sách sản phẩm",
    icon: "tim-icons icon-app",
    component: ProductList,
    layout: "/admin",
    display: true
  },{
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
    display: true
  },{
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
    display: true
  },{
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
    display: true
  },{
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin",
    display: true
  },{
    path: "/goods-receipt/invoice",
    name: "create",
    icon: "tim-icons icon-align-center",
    component: GoodReceiptForm,
    layout: "/admin",
    display: false
  }
];
export default routes;
