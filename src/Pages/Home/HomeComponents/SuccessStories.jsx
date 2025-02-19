// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Virtual,
} from "swiper/modules";

import AOS from "aos";
import { useEffect } from "react";

const SuccessStories = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
      // easing: "ease-in-out",
      //   delay: 100,
    });
  }, []);

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "HR Manager",
      review:
        "TrackSmart has streamlined our asset tracking process like never before. Assigning and reclaiming office equipment is now effortless!",
      image: "https://i.ibb.co.com/DWCRSdL/pro5.jpg",
    },
    {
      name: "Jessica Lee",
      role: "Employee",
      review:
        "Managing office supplies used to be a hassle. With TrackSmart, I can easily request assets, and everything is tracked in real-time.",
      image: "https://i.ibb.co.com/8PkJ8Bh/pro3.jpg",
    },
    {
      name: "James Brown",
      role: "Customer",
      review:
        "The role-based access and real-time updates have significantly improved our workflow. No more lost assets or miscommunication!",
      image: "https://i.ibb.co.com/h7Z10BJ/pro4.jpg",
    },
  ];
  return (
    <section className="pb-12">
      <div className="my-4 md:my-6 lg:my-20 container mx-auto">
        {/* swiper */}
        <div className="w-11/12 mx-auto rounded-lg lg:grid lg:grid-cols-2">
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="md:w-8/12 mx-auto flex flex-col justify-center items-center text-center gap-4 mb-5 "
          >
            <h1 className={`text-2xl lg:text-5xl font-bold `}>
              Success Stories
            </h1>
            <p className="font-medium px-4">
              Hear from HR managers and employees who have transformed their
              asset management with TrackSmart!
            </p>
          </div>
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <Swiper
              effect={"fade"}
              pagination={{
                clickable: true,
              }}
              modules={[Virtual, EffectFade, Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 5000 }}
              loop={true}
              className=""
            >
              {testimonials.map((testimonial, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="mockup-window bg-base-300 border">
                      <div className="bg-base-200 flex flex-col justify-start items-start px-6 py-6">
                        {/* Quote Icon */}
                        <div className="flex flex-col items-center w-full">
                          <div className="text-primary text-4xl">
                            <span className="font-bold">“</span>
                          </div>
                          {/* Review Text */}
                          <p className="text-center leading-relaxed mb-6">
                            {testimonial.review}
                          </p>
                        </div>
                        {/* User Info */}
                        <div className="flex items-center space-x-4">
                          <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                              <img src={testimonial.image} />
                            </div>
                          </div>
                          <div className="text-center">
                            <h4 className="text-lg font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-sm ">{testimonial.role}</p>
                          </div>
                        </div>
                        {/* Rating */}
                        <div className="mt-4 flex space-x-1">
                          {/* <ReactStars {...firstExample} /> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
