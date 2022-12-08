import { RPCMiddleware } from "./createRPCMiddleware";

export type Procedures = Record<
	string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| Procedure<any>
	| Record<
			string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			| Procedure<any>
			| Record<
					string,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					| Procedure<any>
					| Record<
							string,
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							| Procedure<any>
							| Record<
									string,
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									Procedure<any>
							  >
					  >
			  >
	  >
>;

export type Procedure<TArgs extends Record<string, unknown>> = (
	args: TArgs,
) => unknown | Promise<unknown>;

export type ProcedureCallServerArgs = {
	procedurePath: string[];
	procedureArgs: Record<string, unknown>;
};

export type ExtractProcedures<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TRPCServer extends RPCMiddleware<Procedures>,
> = TRPCServer extends RPCMiddleware<infer TProcedures> ? TProcedures : never;

export type ErrorLike = {
	name: string;
	message: string;
	stack?: string;
};
