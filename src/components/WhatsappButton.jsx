import "./css/WhatsappButton.css";

function WhatsappButton(){

    return (
        <a
            href="https://wa.me/216XXXXXXXX"
            className="whatsapp-btn"
            target="_blank"
            rel="noreferrer"
        >
            <i className="fa-brands fa-whatsapp"></i>
        </a>
    );
}

export default WhatsappButton;