import { useEffect, useState } from "react";
import axios from "axios";
import './SliderHome/styleChungIcon.css'
import Layout from "../components/Layout/Layout";
import styles from "./HomePage.module.css";
import { Radio } from "antd";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import SliderHome from "./SliderHome/SliderHome";
import { Prices } from "../components/Prices";
import ScrollToTop from "./SliderHome/ScrollTop";
import { MdOutlineFilterAlt } from "react-icons/md";
import SliderFlash from "./SliderHome/SliderFlash";
import SliderBottom from "./SliderHome/SliderBottom";
import { useNavigate } from "react-router-dom";
import { IoChevronDownSharp } from "react-icons/io5";
import Notification from "../Notification";
import Chatbot from "../chatbot/Chatbot";
// import TidioChat from "../TidioChat";

const API_URL = import.meta.env.VITE_API;

const HomePage = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [radio, setRadio] = useState([]);
    // const [cart, setCart] = useCart([])

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/products`);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };
        getAllProducts();
    }, []);


    //Lọc giá sản phẩm
    useEffect(() => {
        if (!radio || radio.length === 0) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => {
                const price = parseFloat(product.price);
                return price >= radio[0] && price <= radio[1];
            });
            setFilteredProducts(filtered);
        }
    }, [radio, products]);


    const handleBuyNow = (id) => {
        if (!id) {
            console.error("Lỗi: ID sản phẩm không hợp lệ!");
            return;
        }
        navigate(`/detail/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };



    return (
        <Layout title={"Trang chủ"}>
            <SliderHome />
            <Notification />
            <div className={styles.HomePage}>

                <div className={styles.DanhMucLeft}>
                    <h5 className={styles.FilterTitle}>
                        <MdOutlineFilterAlt /> Lọc theo giá SP
                    </h5>
                    <hr />
                    <div className={styles.wrapDanhMucLeft}>
                        <Radio.Group
                            className={styles.RadioGroup}
                            onChange={(e) => setRadio(e.target.value)}
                        >
                            {Prices.map((p) => (
                                <div className={styles.RadioItem} key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                        <button className={styles.ReloadButton} onClick={() => window.location.reload()}>
                            Tải lại
                        </button>
                    </div>
                </div>


                <div className={styles.sanPhamRight}>
                    <div className={styles.sanPhamRightIn}>
                        <div className={styles.flashSale}>
                            <SliderFlash />
                        </div>
                        <div className={styles.wrapProductHome}>
                            <div className={styles.videoProductHome}>
                                <video className={styles.videoQC} controls muted autoPlay loop>
                                    <source src="https://cdn.hoanghamobile.com/FetchVideo?src=/Uploads/2024/12/11/infinix-note-40-pro-w.mp4" type="video/mp4" />
                                    Trình duyệt không hỗ trợ video.
                                </video>
                                <video className={styles.videoQC} controls muted autoPlay loop>
                                    <source src="https://cdn.hoanghamobile.com/FetchVideo?src=/Uploads/2025/02/10/spart-go-1-w-1_638748033500238042.mp4" type="video/mp4" />
                                    Trình duyệt không hỗ trợ video.
                                </video>
                            </div>
                            <p style={{ color: '#4B4B4B', marginTop: '20px', fontWeight: 'bold' }}>Dành cho bạn</p>
                            <div className={styles.productList} >
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <div key={product._id} className={styles.productCart} >
                                            <p
                                                className={`${styles.discountHomeProduct} ${product.discount > 10 ? styles.redBorder : styles.greenBorder
                                                    }`}
                                            >
                                                Giảm {product.discount}%
                                            </p>

                                            <div onClick={() => handleBuyNow(product._id)}>
                                                <img src={product.image} alt={product.name} className={styles.productImageHome} />
                                            </div>
                                            <h6 onClick={() => handleBuyNow(product._id)} style={{ fontWeight: '600', fontSize: '13px', color: '#4b4b4b', cursor: 'pointer' }}>{product.name}</h6>
                                            <div className={styles.flexGiaHome}>
                                                <p className={styles.giaHomeFlex}>{product.price.toLocaleString()}đ</p>
                                                <p className={styles.giaGocHomeFlex}>{product.priceGoc.toLocaleString()}đ</p>
                                            </div>
                                            {/* <p>{product.description.subString(0, 22)}...</p> */}
                                            <p style={{ fontSize: '13px', color: '#4b4b4b' }}>{product.description.substring(0, 27)}...</p>

                                            <div className={styles.flexKhuyenMai}>
                                                <p className={styles.inKM}>KM</p>
                                                <p>Nhiều gói ưu đãi </p>
                                            </div>
                                            <div className={styles.flexKhuyenMai}>
                                                <p className={styles.inKM}>KM</p>
                                                <p>Trả góp 0% - 0 phí - 0 trả</p>
                                            </div>
                                            <div onClick={() => handleBuyNow(product._id)}>
                                                <p style={{ fontSize: '13px', color: '#FC521D', cursor: 'pointer', fontWeight: 'bold' }}><IoChevronDownSharp /> Các ưu đãi khác</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ textAlign: 'center', margin: 'auto', paddingBottom: '20px' }}>Rất tiếc 😢! <br /> Không có sản phẩm nào phù hợp</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <SliderBottom />

            {/* <div style={{ marginTop: '20px ' }}> <TidioChat /></div> */}
            <ScrollToTop />
            <Chatbot />
        </Layout>
    );
};

export default HomePage;
