import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">
                    Patricia & Manel | © All rights reserved {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
