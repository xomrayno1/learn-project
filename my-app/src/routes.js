
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

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },{
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },{
    path: "/brands",
    name: "Danh sách nhãn hiệu",
    icon: "tim-icons icon-puzzle-10",
    component: BrandList,
    layout: "/admin",
  },{
    path: "/categories",
    name: "Danh sách danh mục",
    icon: "tim-icons icon-puzzle-10",
    component: CategoryList,
    layout: "/admin",
  },{
    path: "/suppliers",
    name: "Danh sách nhà cung cấp",
    icon: "tim-icons icon-puzzle-10",
    component: SupplierList,
    layout: "/admin",
  },{
    path: "/products",
    name: "Danh sách sản phẩm",
    icon: "tim-icons icon-puzzle-10",
    component: ProductList,
    layout: "/admin",
  },{
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },{
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },{
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },{
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin",
  },
];
export default routes;
