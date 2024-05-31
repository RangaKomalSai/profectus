import otpGenerator from "otp-generator";

function generateOTP() {
  const OTP = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return OTP;
}

export default generateOTP;
