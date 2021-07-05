import { Box } from "@material-ui/core";
import Grow from "@material-ui/core/Grow";
import LinearProgress from "@material-ui/core/LinearProgress";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type LinearLoadingProps = {
  color: string;
  word: boolean;
};

export default function LinearLoading(props: LinearLoadingProps) {
  let [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <>
      <LinearProgress />
      <Grow in={start}>
        <motion.div
          animate={{
            translateY: [1, 10, 1, 10, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            loop: Infinity,
          }}
        >
          {props.word ? (
            <Box
              style={{
                width: "100%",
                color: props.color,
                fontSize: "30px",
                paddingTop: "40px",
                textAlign: "center",
              }}
            >
              Loading...
            </Box>
          ) : (
            ""
          )}
        </motion.div>
      </Grow>
    </>
  );
}
