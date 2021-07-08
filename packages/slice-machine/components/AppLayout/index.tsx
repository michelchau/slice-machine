import { ReactNode } from "react";
import Navigation from "./Navigation";
import { Box } from "theme-ui";
import Environment from "../../lib/models/common/Environment";
import { ServerState } from "../../lib/models/server/ServerState";

const AppLayout = ({
  children,
  env,
  data
}: {
  children: ReactNode;
  env: Environment;
  data: ServerState;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: ["column", "row", null],
      }}
    >
      <Navigation env={env} warnings={data.warnings} configErrors={data.configErrors} />
      <Box
        as="main"
        sx={{
          flex: 1,
          px: [2, 4, null],
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
