const createOtp = (): { oneTimeCode: string; oneTimeCodeExpire: Date } => {
    const oneTimeCode: string = (
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    ).toString();
    const oneTimeCodeExpire = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes
    return { oneTimeCode, oneTimeCodeExpire };
  };
  
  export default createOtp;