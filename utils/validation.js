export const validateEmail=(email)=>{
    const regexStr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexStr.test(email);
};