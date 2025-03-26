
import { FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import styles from "./styles.module.scss";

export default function Share(){
    return <div className={styles.share}>
       <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={38}/>
       </FacebookShareButton>

       <FacebookMessengerShareButton url={window.location.href}>
        <FacebookMessengerIcon size={38}/>
       </FacebookMessengerShareButton>

       <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={38}/>
       </TwitterShareButton>
        
       <RedditShareButton url={window.location.href}>
        <RedditIcon size={38}/>
       </RedditShareButton>

       <WhatsappShareButton url={window.location.href}>
        <WhatsappIcon size={38}/>
       </WhatsappShareButton>

       <PinterestShareButton url={window.location.href}>
        <PinterestIcon size={38}/>
       </PinterestShareButton>

    </div>;
}