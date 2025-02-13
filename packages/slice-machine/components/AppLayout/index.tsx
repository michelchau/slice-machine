import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import { Box } from "theme-ui";

const AsIs: { [x: string]: boolean } = {
  "/[lib]/[sliceName]/[variation]/simulator": true,
};

type Props = Readonly<{
  children?: ReactNode;
}>;

const AppLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  if (AsIs[router.asPath] || AsIs[router.pathname]) {
    return <main>{children}</main>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: ["column", "row", null],
      }}
    >
      <Box
        as="main"
        sx={{
          flex: 1,
          px: [2, 4, null],
          overflow: "auto",
          display: "flex",
          "& > :first-of-type": {
            flex: 1,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
