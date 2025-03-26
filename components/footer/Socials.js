
import styles from './styles.module.scss';
import { BsFacebook, BsInstagram, BsPinterest, BsSnapchat, BsTiktok, BsTwitter, BsYoutube } from 'react-icons/bs';
export default function Socials(){
    return (
        <div className={styles.footer__socials}>
            <section>
                <h3>STAY CONNECTED</h3>
                <ul>
                    <li>
                        <a href="" target="_blank" >
                            <BsFacebook/>
                        </a>
                    </li>

                    <li>
                        <a href="" target="_blank" >
                            <BsInstagram/>
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" >
                            <BsTwitter/>
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" >
                            <BsYoutube/>
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" >
                            <BsPinterest/>
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" >
                            <BsSnapchat/>
                        </a>
                    </li>
                    <li>
                        <a href="" target="_blank" >
                            <BsTiktok/>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
}