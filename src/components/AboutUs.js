import homeimg from '../assets/home.png'
import Footer from '../components/Footer';

const AboutUs = () => {
    return (
        <div className="container">
            <div className="container d-flex gap-5 mt-5 flex-wrap justify-content-center mb-5">
                <div className="col-12 col-xl-5">
                    <img src={homeimg} alt="home image" width="100%" height="600" className="rounded-5" />
                </div>
                <div className="col-12  col-xl-5">
                    <div>
                        <h4 className="color-text fw-bold">Why Shop With Us</h4>
                        <h2 className="fw-bold">Your trusted destination for quality products, seamless shopping, and reliable delivery.
                        </h2>
                    </div>
                    <div className="mt-5">
                        <p>
                            At Ecommerce, we’re more than just an online store. We’re a team passionate about curating the best products at competitive prices — all while delivering an exceptional shopping experience. Since our launch, we've aimed to combine quality, affordability, and customer-first service into everything we do.
                        </p>
                    </div>
                    <div className="d-flex gap-3 mt-5">
                        <div>
                            <h5 className="fw-bold">Fast & Secure Delivery</h5>
                            <p>
                                We partner with top logistics providers to ensure your orders arrive quickly and securely, no matter where you are.
                            </p>
                        </div>
                        <div>
                            <h5 className="fw-bold">Customer Satisfaction First</h5>
                            <p>
                                Our dedicated support team is here to help — before, during, and after your purchase. We’re committed to making your experience as smooth as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs