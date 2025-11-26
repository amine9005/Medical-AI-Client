const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal border-t-4 footer-center  text-base-content py-8 p-4  border-blue-600">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <a
            href="https://mohamed-amine-portfolio.firebaseapp.com/"
            className="link link-hover text-blue-600 font-semibold"
            target="_blank"
          >
            Amine Selmi
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
