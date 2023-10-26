import "./Footer.css";

function Footer(): JSX.Element {

    const currentYear = new Date().getFullYear();
    return (
        <div className="Footer">
			<p>כל הזכויות שמורות לטרנזוז {currentYear}©️</p>
        </div>
    );
}

export default Footer;
