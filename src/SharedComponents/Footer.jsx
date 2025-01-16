import logo from "../assets/Home page images/footerLogo.png";

const Footer = () => {
  return (
    <section className="">
      <footer className="grid md:grid-cols-2 justify-items-center  bg-neutral text-neutral-content text-center ">
        <div className=" bg-neutral w-full p-10 flex flex-col lg:flex-row gap-4 ">
          <div className="flex flex-col items-center">
            <img src={logo} alt="" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-4xl mb-4">TrackSmart</h1>

            <p className="w-full">
              123 ABS Street, Uni 21, Bangladesh <br /> +88 123456789 <br /> Mon
              - Fri: 08:00 - 22:00 <br /> Sat - Sun: 10:00 - 23:00
            </p>
          </div>
        </div>
        <div className="bg-[#111827] w-full p-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:flex-row">
            <div>
              <nav className="flex flex-col">
                <h6 className="footer-title">Services</h6>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
              </nav>
            </div>

            <div>
              <h6 className="footer-title w-full text-center">Follow us</h6>
              <p className="w-full mb-5">Join us on social media</p>
              <div className="flex items-center justify-center text-center gap-4 w-full mx-auto">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer footer-center bg-black text-white p-4">
        <aside>
          <p>Copyright © TrackSmart. All rights reserved</p>
        </aside>
      </footer>
    </section>
  );
};

export default Footer;
