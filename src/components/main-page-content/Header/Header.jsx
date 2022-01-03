import { Container } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
const Header = () => {
    return (
        <>
            <div className='header' >
                <Container className='header-con'>
                    <div className="header_inner">
                        <div className='header-item1'>
                            <img src="" alt="" />
                            <h5>-PRIMAVERA-</h5>
                        </div>
                        <div className='header-item2'>
                            <p>Fine Textile for</p>
                            <h1>A STUNNING HOME</h1>
                        </div>
                        <button >Shop Now</button>
                    </div>
                </Container>
            </div>
            <div id='new-in' className="new-in">
                <Container>
                    <h3>NEW IN</h3>
                    <strong>____</strong>
                    <p>I'm a paragraph. Click here to add your own text <br /> and edit me. Let your users get to know you.</p>
                    <div className="new-in_items">
                        <div className="new-in_item">
                            <img src="https://static.wixstatic.com/media/45d10e_ef2349ddd9a94713aa97e3f7d97e53ef.jpg/v1/fill/w_350,h_331,al_c,q_85,usm_0.66_1.00_0.01/45d10e_ef2349ddd9a94713aa97e3f7d97e53ef.webp" alt="" />
                            <p>Flamingo Lagoon Pillow</p>
                        </div>
                        <div className="new-in_item">
                            <img src="https://static.wixstatic.com/media/45d10e_e9a39bf1f53a48d1b26a828aa216ef6f.jpg/v1/fill/w_350,h_331,al_c,q_85,usm_0.66_1.00_0.01/45d10e_e9a39bf1f53a48d1b26a828aa216ef6f.webp" alt="" />
                            <p>Jungle Lamp Shade</p>
                        </div>
                        <div className="new-in_item">
                            <img src="https://static.wixstatic.com/media/45d10e_5067d0c1ef1b436f94eaa256987cc155.jpg/v1/fill/w_350,h_303,al_c,q_85,usm_0.66_1.00_0.01/45d10e_5067d0c1ef1b436f94eaa256987cc155.webp" alt="" />
                            <p>Botaical Round <br /> Cushion</p>
                        </div>

                    </div>
                    <button>View Full Collection</button>
                </Container>
            </div>
            <div id='contact' className="contact">
                <Container>
                    <div className='contact_inner'>
                        <h3>We're here to make your design dreams come true</h3>
                        <p>Tel: 123-456-7890  |  Email: info@mysite.com</p>
                        <div className="inputs">
                            <div className='contact-input' >
                                <input type="text" placeholder='Name' /> <br />
                                <input type="text" placeholder='Email' /><br />
                                <input type="number" placeholder='Phone' />
                            </div>
                            <div className='contact-input2' >
                                <input type="text" placeholder='Type your message here...' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                    <h5 className='stores-h5' >Our Stores</h5>
                    <div className='stores' >
                        <div className="stores-item">
                            <h6>SAN FRANCISCO</h6>
                            <p>500 Terry Francois Street <br />San Francisco, CA 94158</p>
                        </div>
                        <div className="stores-item">
                            <h6>NEW YORK</h6>
                            <p>100 Janne Dark Street <br />New York , BD 13258</p>
                        </div>
                    </div>
                </Container>
            </div>
            <div className="join">
                <Container>
                    <div className="join-items">
                        <FacebookIcon style={{ color: "#4D4B4B" }} />
                        <InstagramIcon style={{ color: "#4D4B4B" }} />
                        <PinterestIcon style={{ color: "#4D4B4B" }} />
                    </div>
                    <p>Join our mailing list</p>
                    <input type="text" placeholder='Enter your email here' /> <br />
                    <button>Subscribe Now</button>
                    <p>© 2021 by Osorov Bayel. Proudly created with love</p>
                </Container>
            </div>
        </>
    );
};

export default Header;