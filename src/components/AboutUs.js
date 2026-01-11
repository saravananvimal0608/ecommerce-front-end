import homeimg from '../assets/home.png'

const AboutUs = () => {
    return (
        <div className="container" style={{backgroundColor: '#3E2F5B', minHeight: '100vh', paddingTop: '2rem'}}>
            <div className=" d-flex gap-5 mt-5 flex-wrap justify-content-center mb-5">
                <div className="col-12 col-xl-5 pt-4 pt-xl-0" >
                    <img src={homeimg} alt="home image" width="100%" className="rounded-5 about-img" style={{border: '3px solid #E94560', boxShadow: '0 8px 20px rgba(233, 69, 96, 0.3)'}} />
                </div>
                <div className="col-12  col-xl-5">
                    <div>
                        <h4 className="color-text fw-bold">Why Shop With Us</h4>
                        <h2 className="fw-bold text-white">Your trusted destination for quality products, seamless shopping, and reliable delivery.
                        </h2>
                    </div>
                    <div className="mt-5">
                        <p className="text-white opacity-90">
                            At Ecommerce, we're more than just an online store. We're a team passionate about curating the best products at competitive prices — all while delivering an exceptional shopping experience. Since our launch, we've aimed to combine quality, affordability, and customer-first service into everything we do.
                        </p>
                    </div>
                    <div className="d-flex gap-3 mt-5">
                        <div>
                            <h5 className="fw-bold text-white">Fast & Secure Delivery</h5>
                            <p className="text-white opacity-75">
                                We partner with top logistics providers to ensure your orders arrive quickly and securely, no matter where you are.
                            </p>
                        </div>
                        <div>
                            <h5 className="fw-bold text-white">Customer Satisfaction First</h5>
                            <p className="text-white opacity-75">
                                Our dedicated support team is here to help — before, during, and after your purchase. We're committed to making your experience as smooth as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs