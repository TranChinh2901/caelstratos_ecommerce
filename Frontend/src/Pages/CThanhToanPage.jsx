import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import styles from "./styles/ThanhToanPage.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { Image } from "antd";
import toast from "react-hot-toast";

const CThanhToanPage = () => {
    const location = useLocation();
    const cart = location.state?.cart || [];

    const totalPrice = () => {
        if (!cart || cart.length === 0) return "0 VND";
        try {
            let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            return total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } catch (error) {
            console.error("Error calculating total price:", error);
            return "0 VND";
        }
    };
    const handleVoucher = () => {
        toast.error("Chức năng đang được phát triển 🚀");
    }

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <Layout title="Thanh Toán">
            {/* <h2>Trang Thanh Toán</h2>
            {cart.length > 0 ? (
                <ul>
                    {cart.map((item) => (
                        <li key={item._id}>
                            <div>
                                {item.name}
                            </div>
                            <div>
                                {item.price} VND
                            </div>
                            <div>
                                <img src={item.image} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có sản phẩm trong giỏ hàng.</p>
            )} */}
            <div className={styles.wrapGioHang}>
                <div className={styles.wrapInGioHang}>
                    <p style={{ fontSize: '15px' }}> <GoHome />Trang chủ <MdNavigateNext /> Đặt hàng</p>
                    {cart.length > 0 ? (
                        <div className={styles.InINWrapGioHang}>
                            <div className={styles.leftInINWrapGioHang}>
                                {cart.map((item) => (
                                    <div key={item._id} className={styles.productItemLeft}>
                                        <div className={styles.productImageLeft}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                cl assName={styles.productImageInLeft}
                                            />
                                        </div>
                                        <div className={styles.productInfoLeft}>
                                            <div>
                                                <h4>Sản phẩm: {item.name}</h4>
                                                <div>Màu: undefiled</div>
                                            </div>
                                            {/* <div>{item.description.substring(0, 25)}...</div> */}
                                            <div className={styles.removeBtn}>Số lượng: {item.quantity}</div>
                                            <div>
                                                <div style={{ color: '#FD475A', fontWeight: 'bold', fontSize: '14px' }}>{(item.price * item.quantity).toLocaleString()}đ</div>
                                                <div className={styles.forcusLineThrough}>{(item.priceGoc).toLocaleString()}đ</div>
                                            </div>

                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className={styles.rightInINWrapGioHang}>
                                <h4 className={styles.h4TongGioHang}>
                                    <div style={{ padding: '5px' }}>Tổng giỏ hàng</div>
                                </h4>
                                <div className="text-center">Total | Checkout | Payment</div>
                                <div className={styles.nhapMaUuDai}>
                                    <input type="text" placeholder="Nhập mã ưu đãi" />
                                    <button onClick={() => handleVoucher()}>Áp dụng</button>
                                </div>
                                <div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>Tổng sản phẩm : </div>
                                        <div >
                                            {totalQuantity} SP
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>Tổng tiền: </div>
                                        <div >
                                            {totalPrice()}
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA} >
                                            Tổng khuyến mãi:
                                        </div>
                                        <div>200.000đ</div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>
                                            Voucher:
                                        </div>
                                        <div>
                                            0đ
                                        </div>
                                    </div>
                                    <div className={styles.WrapTongTien}>
                                        <div className={styles.totalA}>
                                            Cần thanh toán:
                                        </div>
                                        <div className={styles.totalB}>  {(
                                            parseInt(totalPrice().replace(/[^\d]/g, ''), 10) - 200000
                                        ).toLocaleString("vi-VN")}đ</div>
                                    </div>
                                </div>
                                <button className={styles.btnXacNhanDon}>
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>Không có sản phẩm trong giỏ hàng.</p>
                    )}

                </div>
            </div>
        </Layout>
    );
};

export default CThanhToanPage;
