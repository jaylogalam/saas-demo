export type OtpParams = {
  type: "signup" | "recovery";
  email: string;
};

export type OtpVerifyParams = OtpParams & {
  token: string;
};
