const Footer = () => {
  return (
    <footer className="flex items-center justify-center mb-5">
      <a href="">
        <img
          className="hover:scale-110 transition-all duration-300"
          width={35}
          height={35}
          src="/github-logo.png"
          alt="github-logo"
        />
      </a>
      <a href="https://hikmatbek.uz/">
        <img
          className="hover:scale-110 transition-all duration-300"
          width={30}
          height={30}
          src="/web.png"
          alt="web logo"
        />
      </a>
    </footer>
  );
};

export default Footer;
