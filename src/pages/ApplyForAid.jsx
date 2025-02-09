import "../css/donate.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from "react-hook-form"; // Importing react-hook-form

export default function Donate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    // Show loading alert
    const loading = MySwal.fire({
      title: "Initializing payment...",
      text: "Don't close or refresh the tab. Please Wait...",
      didOpen: () => MySwal.showLoading(),
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });

    try {
      const response = await axios.post(
        "",
        {
          ...data,
        }
      );

      console.log(response.data);
      MySwal.fire({
        icon: "success",
        title: "Payment Initialized Successfully!",
      });
    } catch (error) {
      console.error("Error:", error);
      MySwal.fire({
        icon: "error",
        title: "Payment Failed!",
      });
    }
  };

  return (
    <>
      <Navbar />
      <PageHeader title={"Donate Now"} path={"/donate"} name={"Donate"} />
      <div className="container mt-4 p-4 border rounded  shadow p-3 mb-5 bg-white ">
        <h2 className="text-center">আর্থিক সহায়তার জন্য আবেদন</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* ব্যক্তিগত তথ্য */}
            <div className="col-md-6">
              <h5>ব্যক্তিগত তথ্য:</h5>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  আন্দোলনকারীর নাম:
                </label>
                <input
                  type="text"
                  id="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name", { required: "নাম আবশ্যক!" })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  সহায়তার পরিমাণ:
                </label>
                <input
                  type="number"
                  id="amount"
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  }`}
                  {...register("amount", {
                    required: "পরিমাণ আবশ্যক!",
                    min: { value: 1, message: "কমপক্ষে 1 টাকা প্রদান করুন" },
                  })}
                />
                {errors.amount && (
                  <div className="invalid-feedback">
                    {errors.amount.message}
                  </div>
                )}
              </div>
            </div>

            {/* যোগাযোগের তথ্য */}
            <div className="col-md-6">
              <h5>যোগাযোগের তথ্য:</h5>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  ইমেইল:
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", { required: "ইমেইল আবশ্যক!" })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  মোবাইল নম্বর:
                </label>
                <input
                  type="text"
                  id="mobile"
                  className={`form-control ${
                    errors.mobile ? "is-invalid" : ""
                  }`}
                  {...register("mobile", { required: "মোবাইল নম্বর আবশ্যক!" })}
                />
                {errors.mobile && (
                  <div className="invalid-feedback">
                    {errors.mobile.message}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Fields */}
          <h5>অতিরিক্ত তথ্য:</h5>
          <div className="mb-3">
            <label htmlFor="nationalId" className="form-label">
              জাতীয় পরিচয়পত্র/জন্মনিবন্ধন নম্বর:
            </label>
            <input
              type="text"
              id="nationalId"
              className={`form-control ${
                errors.nationalId ? "is-invalid" : ""
              }`}
              {...register("nationalId", {
                required: "জাতীয় পরিচয়পত্র নম্বর আবশ্যক!",
              })}
            />
            {errors.nationalId && (
              <div className="invalid-feedback">
                {errors.nationalId.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="occupation" className="form-label">
              পেশা:
            </label>
            <input
              type="text"
              id="occupation"
              className={`form-control ${
                errors.occupation ? "is-invalid" : ""
              }`}
              {...register("occupation", { required: "পেশা আবশ্যক!" })}
            />
            {errors.occupation && (
              <div className="invalid-feedback">
                {errors.occupation.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="hospital" className="form-label">
              হাসপাতালের নাম:
            </label>
            <input
              type="text"
              id="hospital"
              className={`form-control ${errors.hospital ? "is-invalid" : ""}`}
              {...register("hospital", { required: "হাসপাতালের নাম আবশ্যক!" })}
            />
            {errors.hospital && (
              <div className="invalid-feedback">{errors.hospital.message}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            জমা দিন
          </button>
        </form>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
