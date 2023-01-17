export default function Footer() {
    return (
        <>
            
                {/* Footer */}
                <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#3e4551' }}>
                    {/* Grid container */}
                    <div className="container p-4 pb-0">
                        {/* Section: Links */}
                        <section >
                            {/*Grid row*/}
                            <div className="row">
                                {/*Grid column*/}
                                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Mission of this site</h5>
                                    <p>
                                        To make it easily accessible for people to search for popular movie and its detailed information
                                    </p>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Donate Here</h5>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <a  className="text-white">Paypal</a>
                                        </li>
                                        <li>
                                            <a className="text-white">Bitcoin</a>
                                        </li>
                                        <li>
                                            <a  className="text-white">Dogecoin</a>
                                        </li>
                                        <li>
                                            <a  className="text-white">ETH</a>
                                        </li>
                                    </ul>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Follow Us on Social Media</h5>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <a  className="text-white">Twitter</a>
                                        </li>
                                        <li>
                                            <a  className="text-white">Youtube</a>
                                        </li>
                                        <li>
                                            <a  className="text-white">Instagram</a>
                                        </li>
                                        <li>
                                            <a  className="text-white">Facebook</a>
                                        </li>
                                    </ul>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Phone Number</h5>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <h6  className="text-white">123469420</h6>
                                        </li>
                                        
                                    </ul>
                                </div>
                                {/*Grid column*/}
                                {/*Grid column*/}
                                <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
                                    <h5 className="text-uppercase">Address</h5>
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <h6  className="text-white">Florida, 21 Jump Street</h6>
                                        </li>
                                       
                                    </ul>
                                </div>
                                {/*Grid column*/}
                            </div>
                            {/*Grid row*/}
                        </section>
                        {/* Section: Links */}
                        <hr className="mb-4" />
                        {/* Section: CTA */}
                   
                    </div>
                    {/* Grid container */}
                    {/* Copyright */}
                    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                        © 2020 Copyright:
                        <a className="text-white" > Movie Site dot Com</a>
                    </div>
                    {/* Copyright */}
                </footer>
                {/* Footer */}
           
        </>
    )
}