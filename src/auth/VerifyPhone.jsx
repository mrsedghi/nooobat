import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

function VerifyPhone() {
  const playerRef1 = useRef(null);

  useEffect(() => {
    playerRef1.current?.playFromBeginning();
  }, []);

  return (
    <Box className="flex flex-col flex-nowrap justify-around lg:px-24 p-10 h-screen">
      <Box className="mt-16">
        <Box className="mb-4 flex flex-row-reverse justify-between items-center flex-wrap">
          <h3 dir="rtl" className="text-xs">
            کد تایید به شماره{" "}
            <Box
              component="span"
              sx={{ color: "primary.main" }}
              className="font-peydaMed text-xs"
              dir="rtl"
            >
              09112345678
            </Box>
            پیامک شد
          </h3>

          <Link
            to={"/login"}
            sx={{
              color: "primary.main",
              "&:hover": { color: "secondary.main" },
            }}
            className="text-xs font-peydaMed"
          >
            <ArrowBackIosIcon sx={{ fontSize: 15 }} /> اصلاح شماره
          </Link>
        </Box>
        <TextField
          label="کد تایید را وارد کنید"
          variant="outlined"
          dir="rtl"
          className="w-full font-peydaReg"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "primary.main" },
              "&:hover fieldset": { borderColor: "secondary.main" },
            },
          }}
        />
      </Box>
      <Box className="">
        <h6 className="text-xs font-peydasemBold text-slate-400 text-center mb-2">
          ارسال مجدد کد (01:30)
        </h6>
        <Link to={"/main"}>
          <Button
            variant="contained"
            className="w-full h-12"
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            ثبت کد ورود
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default VerifyPhone;
