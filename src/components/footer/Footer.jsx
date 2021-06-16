import React from 'react';
import footerClasses from './footer.module.css';
import vkIcon from './../../assets/img/vk.svg'
import githubIcon from './../../assets/img/github.svg';

const Footer = () => {
    return (
        <footer className={footerClasses.footer}>

            <div className={footerClasses.leftCol}>
                <ul>
                    <li>
                        <a href="https://vk.com/maxim.abuzarov" target='_blank' rel="noreferrer">
                            <img src={vkIcon} alt="VK icon"/>
                            <span>VK</span>
                        </a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="https://github.com/maxim-abuzarov" target='_blank' rel="noreferrer">
                            <img src={githubIcon} alt="Github icon"/>
                            <span>GitHub</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className={footerClasses.rightCol}>
                <p>	&copy; Abuzarov Maxim, 2021</p>
            </div>

        </footer>
    );
};

export default Footer;
