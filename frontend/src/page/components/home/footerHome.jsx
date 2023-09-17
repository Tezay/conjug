import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
        <footer class="homeFooter" id="contact-us">
                <div class="container">
                    <div class="footer-content">

                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="sub-footer">
                                <p>conjug.fr &copy; 2023

                                | créé par Cédric & Eliot pour le lycée <Link target="blank" to="https://julesferry-cannes.fr/">Jules Ferry</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;