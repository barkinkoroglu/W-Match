import Logo from "../images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img
            alt="logo"
            src={require("../images/logo.png")}
            className=" w-[160px] h-16 object-cover"
          />

          <p className="my-5">
            Join W-Match today and unlock the full potential of your job search
            or recruitment process! Whether you are a job seeker looking for
            your dream job or a company seeking top talent, W-Match is your
            go-to platform for making meaningful connections that can shape your
            career or business success. Experience the power of W-Match and
            elevate your employment journey to new heights!
          </p>
          <p>© W-MATCH All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Instagram</p>
          <p className="my-5">Facebook</p>
          <p>Twitter</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">Barkin Koroglu</p>
          <p className="my-5">Öykü Yatkın</p>
          <p className="my-5">Cem Tuna Koç</p>
          <p>(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
